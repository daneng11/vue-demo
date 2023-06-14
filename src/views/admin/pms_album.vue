<template>
  <div class="root">
    <el-input v-model="searchText" placeholder="请输入搜索关键字" clearable @clear="clearSearch" @keyup.enter="performSearch"
      style="margin-bottom: 20px;"></el-input>

    <el-table :data="paginatedData" :header-cell-style="{ background: '#eef1f6' ,color: '#606266',textAlign: 'center'}" 
      borde header-align="center" 
      :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="coverPic" label="图片">
        <template #default="{ row }">
          <img v-if="isNaN(Number(row.coverPic, 10))" :src="row.coverPic" alt="图标" width="30" height="30">
          <img v-else src="../../imgs/1.jpg" alt="图标" width="140" height="140">
        </template>
      </el-table-column>
      <el-table-column prop="picCount" label="数量"></el-table-column>
      <el-table-column prop="sort" label="分类"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column width="150rpx" label="操作" >
        <template #default="{ row }">
          <el-button v-if="row.isNew" size="mini" class="custom-button" type="success" circle @click="Insert(row)">
            <el-icon>
              <Position />
            </el-icon>
          </el-button>

          <el-button v-else class="custom-button" size="mini" type="warning" @click="Alter(row)" style="margin: 5px;">上传
            <el-icon>
              <Upload />
            </el-icon>
          </el-button>

          <el-button  type="primary" size="mini" @click="openEditDialog(row)" style="margin: 5px;">修改
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-button v-if="row.isNew" size="mini" type="danger" circle @click="delND(row)">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
          <el-button v-else type="danger" size="mini" @click="Del(row)" style="margin: 5px;">删除
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
      <el-form>
        <el-form-item label="编号：">
          <el-input v-model="editItem.id" type="number"
            onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"></el-input>
        </el-form-item>

        <el-form-item label="名称：">
          <el-input v-model="editItem.name"></el-input>
        </el-form-item>
        <el-form-item label="图标路径">
          <el-upload action="/upload"
                     v-model="editItem.coverPic"
                     list-type="picture"
                     :auto-upload="false">
            <el-button slot="trigger"
                       size="small"
                       circle
                       type="primary"><el-icon>
                <el-icon>
                  <Upload />
                </el-icon></el-icon></el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="数量：">
          <el-input v-model="editItem.picCount"></el-input>
        </el-form-item>

        <el-form-item label="分类：">
          <el-input v-model="editItem.sort"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="editItem.description"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>

        <el-button type="primary" @click="saveEdit">保存</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" size="large" @click="addAPI" style="margin-top: 20px;margin-left: 50%;">添加
      <el-icon>
        <Plus />
      </el-icon>
    </el-button>
  </div>
</template>
<script>
import api from '../../http/pms_album.js'
import {
  ElMessage,
  ElMessageBox,
  roleTypes
} from 'element-plus';



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
          return String(item.id).includes(String(this.searchText));
        });
      } else {
        return this.tableData;
      }
    }
  },
  methods: {
    openEditDialog(row) {
      this.editItem = {
        ...row
      }; // 创建一个副本以防止直接修改原始数据
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
        "coverPic": "",
        "description": "",
        "id": 0,
        "name": "",
        "picCount": 0,
        "sort":"",
        "isNew": "true",
      }
      this.tableData.push(newAPI);
      const lastPage = Math.ceil(this.tableData.length / this.pageSize);
      this.handlePageChange(lastPage);
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
}</style>