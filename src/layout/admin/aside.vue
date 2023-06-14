<template>
    <el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>闪购管理</span>
            </template>
            <el-menu-item-group title="管理中心">
            
                <el-menu-item index="/admin/sms_flash_promotion">闪购管理</el-menu-item>
                <el-menu-item index="/admin/pms_album">闪购商品</el-menu-item>
                <el-menu-item index="/admin/Info">闪购日志</el-menu-item>
                <el-menu-item index="/admin/sms_flash_promotion_session">订单历史</el-menu-item>
                <el-menu-item index="/admin/oms_company_address">发货地址</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon>
                 <setting />
            </el-icon>
            <span>系统设置</span>
      
    </el-menu-item>
          
    </el-menu>
</template>

<script>
import { defineComponent } from "vue"
import {
    Document,
    Menu ,
    Location,
    Setting,
} from '@element-plus/icons-vue'
export default defineComponent({
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
    },
    components: {
        Document,
        Menu ,
        Location,
        Setting,

    }
});
</script>

<style lang="scss" scoped></style>
