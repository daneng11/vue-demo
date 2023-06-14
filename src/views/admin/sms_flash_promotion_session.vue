<template>
  <div>
    <el-input v-model="searchText" placeholder="请输入搜索关键字" clearable @clear="clearSearch" @keyup.enter="performSearch"
      style="margin-bottom: 20px;"></el-input>

    <el-table :data="paginatedData" :header-cell-style="{
      background: '#eef1f6',
      color: '#606266'
    }" borde>
      <!-- <el-table-column prop="id" label="Items"></el-table-column> -->
      <el-table-column prop="memberId" label="会员id"></el-table-column>
      <!-- <el-table-column prop="memberPhone" label="会员电话"> -->
      <!-- </el-table-column> -->

      <el-table-column prop="productId" label="工厂id"></el-table-column>
      <el-table-column prop="productName" label="发货工厂名"></el-table-column>
      <el-table-column prop="sendTime" label="下单时间">
        <template #default="{ row }">
          {{ formatDateTime(row.sendTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="subscribeTime" label="派发时间">
        <template #default="{ row }">
          {{ formatDateTime(row.subscribeTime) }}
        </template>

      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button v-if="row.isNew" class="custom-button" type="success" circle @click="Insert(row)">
            <el-icon>
              <Position />
            </el-icon>
          </el-button>

          <el-button v-else class="custom-button" type="warning" circle @click="Alter(row)">
            <el-icon>
              <Position />
            </el-icon>
          </el-button>

          <el-button type="primary" circle @click="openEditDialog(row)">
            <el-icon>
              <EditPen />
            </el-icon>
          </el-button>
          <el-button v-if="row.isNew" type="danger" circle @click="delND(row)">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
          <el-button v-else type="danger" circle @click="Del(row)">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :current-page="currentPage" :page-size="pageSize" :total="filteredtableData.length"
      @current-change="handlePageChange">
    </el-pagination>

    <el-dialog class="form" v-model="editDialogVisible" @close="editDialogVisible = false">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="会员id">
          <el-input v-model="editItem.memberId"></el-input>
        </el-form-item>

        <el-form-item label="工厂id">
          <el-input v-model="editItem.productId"></el-input>
        </el-form-item>

        <el-form-item label="工厂名称">
          <el-input v-model="editItem.productName"></el-input>
        </el-form-item>

        <el-form-item label="下单时间">
            <el-date-picker v-model="editItem.sendTime" type="datetime" placeholder="确定下单时间"
            format="YYYY-MM-DD hh:mm:ss">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="派发时间">
          <el-date-picker v-model="editItem.subscribeTime" type="datetime" placeholder="选择派发时间"
            format="YYYY-MM-DD hh:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>

        <el-button type="primary" @click="saveEdit">保存</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" circle @click="addAPI" style="margin-top: 10px;">
      <el-icon>
        <CirclePlusFilled />
      </el-icon>
    </el-button>
  </div>
</template>
<script>
import api from '@/http/sms_flash_promotion_session.js'
import { ElMessage, ElMessageBox, roleTypes } from 'element-plus';


export default {
  data() {
    return {
      json: {
        current: 1,
        size: 99
      },

      searchText: '',
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页显示的数据条数
      total: 0,
      tableData: [],
      editDialogVisible: false,
      editItem: {},
      selectedRow: null

      // 其他的 data 属性
    }
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredtableData.slice(startIndex, endIndex);
    },
    filteredtableData() {
      if (this.searchText) {
        return this.tableData.filter(item => {
          return String(item.memberPhone).includes(String(this.searchText));
        });
      } else {
        return this.tableData;
      }
    }
  },
  methods: {
    openEditDialog(row) {
      this.editItem = { ...row }; // 创建一个副本以防止直接修改原始数据
      this.editDialogVisible = true;
    },
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },


    saveEdit() {
      console.log(this.editItem);
      ElMessageBox.confirm('确定修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const index = this.tableData.findIndex(item => item.id === this.editItem.id);
          if (index !== -1) {
            // 替换原有的数据
            this.tableData.splice(index, 1, this.editItem);
          } else {
            // 添加编辑后的数据
            this.tableData.push(this.editItem);
          }
          this.editDialogVisible = false;
          ElMessage.success('修改成功！');
          this.editItem = {}; // 将编辑项重置为空对象
        })
        .catch(() => {
          // 取消保存操作
          ElMessage.info('修改取消！');

        });
    },


    fetchData() {
      api.Page(this.json)
        .then(response => {
          this.tableData = response.data.data.page.records || response.data.records;
          console.log(response);
          ElMessage.success('刷新成功！');
        })
        .catch(error => {
          ElMessage.error('刷新失败，请检查网络！');

          console.error('Error fetching data:', error);
        });
    },

    Insert(row) {
      api.Add(row)
        .then((response) => {
          delete row.isNew
          ElMessage.success('插入数据成功！');

        })
        .catch((error) => {
          ElMessage.error('插入数据失败！');

          console.error('保存修改失败:', error);
        });
    },
    Alter(row) {
      api.Edit(row)
        .then((response) => {
          // 修改保存成功，可以进行一些操作，例如提示用户保存成功或更新本地数据
          console.log('修改保存成功:', response.data);
          ElMessage.success('修改数据成功！');

          // 重新获取数据，更新tableData
          // 完成保存后，关闭修改框并重置编辑项
        })
        .catch((error) => {
          ElMessage.error('修改数据失败！');
          console.error('保存修改失败:', error);
          // 处理保存失败的情况
        });
    },

    Del(row) {
      ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        api.Del(row.id)
          .then(response => {
            // 在这里执行删除成功的操作，例如重新获取数据等
            const index = this.tableData.findIndex(api => api.id === row.id);
            if (index !== -1) {
              this.tableData.splice(index, 1); // 从数据源中删除API对象
            }
            console.log('删除成功:', response.data);
            ElMessage.success('删除成功！');

          })
          .catch(error => {
            ElMessage.error(response.msg);

            console.error('删除失败:', error);
            // 处理删除失败的情况
          });
      }).catch(() => {
        // 取消删除操作
      });
    },
    delND(row) {
      // 在这里处理删除逻辑，可以在确认后从数据源中删除API对象或向服务器发送删除请求
      // 这里使用 Element Plus 的 ElMessageBox 弹窗组件来确认删除操作
      ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 用户点击了确定按钮，执行删除操作
          const index = this.tableData.findIndex(api => api.id === row.id);
          if (index !== -1) {
            this.tableData.splice(index, 1); // 从数据源中删除API对象
          }
          ElMessage.success('删除成功！');

        })

        .catch(() => {
          ElMessage.error('删除失败！');

          // 用户点击了取消按钮，取消删除操作
          console.log('取消删除 API', row);
        });
    },

    // 可以添加其他方法来实现创建和查看功能
    addAPI() {
      ElMessage.success("添加数据ing");
      const newAPI = {
        "id": 0,
        "memberId": 0,
        "memberPhone": "",
        "productId": 0,
        "productName": "",
        "sendTime": "",
        "subscribeTime": "",
        "isNew": true,
      };
      this.tableData.push(newAPI);
      const lastPage = Math.ceil(this.tableData.length / this.pageSize);
      this.handlePageChange(lastPage);
    },
    formatDateTime(date) {
      if (date == "" || !date) {
        return "";
      }
      var date = new Date(date);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second = date.getSeconds();
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },

  },
  created() {
    this.fetchData()
  }
}
</script>

<style >
body {
  margin: 0;
  padding: 0;
  background-size: cover;
  opacity: 0.9 !important;
  /* 使用 !important 提高优先级 */
  background-repeat: no-repeat;
}
</style>