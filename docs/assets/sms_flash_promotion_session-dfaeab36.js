import{_ as Y,O as y,c as A,x as l,v as U,y as o,J as q,P as F,o as f,Q as I,R as v,z as V,S as K,E as L,T as j,V as O}from"./index-20b3045b.js";import{a as g,E as R,b as x,c as i,d as H,e as J,f as Q,g as G}from"./index-6d1f17fb.js";import{E as W}from"./el-date-picker-665d7a05.js";let T;const _=()=>{T=R.service({lock:!0,text:"加载中...",spinner:"wave"})},b=()=>{T&&T.close()},X=async t=>{_();try{return await g.request({url:"/mall/sms-flash-promotion-session/one/"+t,method:"get"})}catch(e){throw e}finally{b()}},Z=async t=>{_();try{return await g.request({url:"/mall/sms-flash-promotion-session/del/"+t,method:"get"})}catch(e){throw e}finally{b()}},$=async t=>{_();try{return await g.request({url:"/mall/sms-flash-promotion-session/edit",method:"post",data:t})}catch(e){throw e}finally{b()}},ee=async t=>{_();try{return await g.request({url:"/mall/sms-flash-promotion-session/add",method:"post",data:t})}catch(e){throw e}finally{b()}},te=async t=>{_();try{return await g.request({url:"/mall/sms-flash-promotion-session/page",method:"post",data:t})}catch(e){throw e}finally{b()}},C={One:X,Del:Z,Edit:$,Add:ee,Page:te};const le={data(){return{json:{current:1,size:99},searchText:"",currentPage:1,pageSize:6,total:0,tableData:[],editDialogVisible:!1,editItem:{},selectedRow:null}},computed:{paginatedData(){const t=(this.currentPage-1)*this.pageSize,e=t+this.pageSize;return this.filteredtableData.slice(t,e)},filteredtableData(){return this.searchText?this.tableData.filter(t=>String(t.memberPhone).includes(String(this.searchText))):this.tableData}},methods:{openEditDialog(t){this.editItem={...t},this.editDialogVisible=!0},handlePageChange(t){this.currentPage=t},saveEdit(){console.log(this.editItem),x.confirm("确定修改吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{const t=this.tableData.findIndex(e=>e.id===this.editItem.id);t!==-1?this.tableData.splice(t,1,this.editItem):this.tableData.push(this.editItem),this.editDialogVisible=!1,i.success("修改成功！"),this.editItem={}}).catch(()=>{i.info("修改取消！")})},fetchData(){C.Page(this.json).then(t=>{this.tableData=t.data.data.page.records||t.data.records,console.log(t),i.success("刷新成功！")}).catch(t=>{i.error("刷新失败，请检查网络！"),console.error("Error fetching data:",t)})},Insert(t){C.Add(t).then(e=>{delete t.isNew,i.success("插入数据成功！")}).catch(e=>{i.error("插入数据失败！"),console.error("保存修改失败:",e)})},Alter(t){C.Edit(t).then(e=>{console.log("修改保存成功:",e.data),i.success("修改数据成功！")}).catch(e=>{i.error("修改数据失败！"),console.error("保存修改失败:",e)})},Del(t){x.confirm("确定要删除吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{C.Del(t.id).then(e=>{const u=this.tableData.findIndex(c=>c.id===t.id);u!==-1&&this.tableData.splice(u,1),console.log("删除成功:",e.data),i.success("删除成功！")}).catch(e=>{i.error(response.msg),console.error("删除失败:",e)})}).catch(()=>{})},delND(t){x.confirm("确定要删除吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{const e=this.tableData.findIndex(u=>u.id===t.id);e!==-1&&this.tableData.splice(e,1),i.success("删除成功！")}).catch(()=>{i.error("删除失败！"),console.log("取消删除 API",t)})},addAPI(){i.success("添加数据ing");const t={id:0,memberId:0,memberPhone:"",productId:0,productName:"",sendTime:"",subscribeTime:"",isNew:!0};this.tableData.push(t);const e=Math.ceil(this.tableData.length/this.pageSize);this.handlePageChange(e)},formatDateTime(e){if(e==""||!e)return"";var e=new Date(e),u=e.getFullYear(),c=e.getMonth()+1;c=c<10?"0"+c:c;var n=e.getDate();n=n<10?"0"+n:n;var s=e.getHours();s=s<10?"0"+s:s;var d=e.getMinutes();d=d<10?"0"+d:d;var r=e.getSeconds();return r=r<10?"0"+r:r,u+"-"+c+"-"+n+" "+s+":"+d+":"+r}},created(){this.fetchData()}},ae={slot:"footer"};function oe(t,e,u,c,n,s){const d=q,r=G,k=y("Position"),p=L,m=F,w=y("EditPen"),E=y("Delete"),N=H,B=J,h=j,P=W,S=O,z=Q,M=y("CirclePlusFilled");return f(),A("div",null,[l(d,{modelValue:n.searchText,"onUpdate:modelValue":e[0]||(e[0]=a=>n.searchText=a),placeholder:"请输入搜索关键字",clearable:"",onClear:t.clearSearch,onKeyup:U(t.performSearch,["enter"]),style:{"margin-bottom":"20px"}},null,8,["modelValue","onClear","onKeyup"]),l(N,{data:s.paginatedData,"header-cell-style":{background:"#eef1f6",color:"#606266"},borde:""},{default:o(()=>[l(r,{prop:"memberId",label:"会员id"}),l(r,{prop:"productId",label:"工厂id"}),l(r,{prop:"productName",label:"发货工厂名"}),l(r,{prop:"sendTime",label:"下单时间"},{default:o(({row:a})=>[I(v(s.formatDateTime(a.sendTime)),1)]),_:1}),l(r,{prop:"subscribeTime",label:"派发时间"},{default:o(({row:a})=>[I(v(s.formatDateTime(a.subscribeTime)),1)]),_:1}),l(r,{label:"操作"},{default:o(({row:a})=>[a.isNew?(f(),V(m,{key:0,class:"custom-button",type:"success",circle:"",onClick:D=>s.Insert(a)},{default:o(()=>[l(p,null,{default:o(()=>[l(k)]),_:1})]),_:2},1032,["onClick"])):(f(),V(m,{key:1,class:"custom-button",type:"warning",circle:"",onClick:D=>s.Alter(a)},{default:o(()=>[l(p,null,{default:o(()=>[l(k)]),_:1})]),_:2},1032,["onClick"])),l(m,{type:"primary",circle:"",onClick:D=>s.openEditDialog(a)},{default:o(()=>[l(p,null,{default:o(()=>[l(w)]),_:1})]),_:2},1032,["onClick"]),a.isNew?(f(),V(m,{key:2,type:"danger",circle:"",onClick:D=>s.delND(a)},{default:o(()=>[l(p,null,{default:o(()=>[l(E)]),_:1})]),_:2},1032,["onClick"])):(f(),V(m,{key:3,type:"danger",circle:"",onClick:D=>s.Del(a)},{default:o(()=>[l(p,null,{default:o(()=>[l(E)]),_:1})]),_:2},1032,["onClick"]))]),_:1})]),_:1},8,["data"]),l(B,{"current-page":n.currentPage,"page-size":n.pageSize,total:s.filteredtableData.length,onCurrentChange:s.handlePageChange},null,8,["current-page","page-size","total","onCurrentChange"]),l(z,{class:"form",modelValue:n.editDialogVisible,"onUpdate:modelValue":e[7]||(e[7]=a=>n.editDialogVisible=a),onClose:e[8]||(e[8]=a=>n.editDialogVisible=!1)},{default:o(()=>[l(S,{"label-width":"100px","label-position":"left"},{default:o(()=>[l(h,{label:"会员id"},{default:o(()=>[l(d,{modelValue:n.editItem.memberId,"onUpdate:modelValue":e[1]||(e[1]=a=>n.editItem.memberId=a)},null,8,["modelValue"])]),_:1}),l(h,{label:"工厂id"},{default:o(()=>[l(d,{modelValue:n.editItem.productId,"onUpdate:modelValue":e[2]||(e[2]=a=>n.editItem.productId=a)},null,8,["modelValue"])]),_:1}),l(h,{label:"工厂名称"},{default:o(()=>[l(d,{modelValue:n.editItem.productName,"onUpdate:modelValue":e[3]||(e[3]=a=>n.editItem.productName=a)},null,8,["modelValue"])]),_:1}),l(h,{label:"下单时间"},{default:o(()=>[l(P,{modelValue:n.editItem.sendTime,"onUpdate:modelValue":e[4]||(e[4]=a=>n.editItem.sendTime=a),type:"datetime",placeholder:"确定下单时间",format:"YYYY-MM-DD hh:mm:ss"},null,8,["modelValue"])]),_:1}),l(h,{label:"派发时间"},{default:o(()=>[l(P,{modelValue:n.editItem.subscribeTime,"onUpdate:modelValue":e[5]||(e[5]=a=>n.editItem.subscribeTime=a),type:"datetime",placeholder:"选择派发时间",format:"YYYY-MM-DD hh:mm:ss"},null,8,["modelValue"])]),_:1})]),_:1}),K("div",ae,[l(m,{onClick:e[6]||(e[6]=a=>n.editDialogVisible=!1)},{default:o(()=>[I("取消")]),_:1}),l(m,{type:"primary",onClick:s.saveEdit},{default:o(()=>[I("保存")]),_:1},8,["onClick"])])]),_:1},8,["modelValue"]),l(m,{type:"primary",circle:"",onClick:s.addAPI,style:{"margin-top":"10px"}},{default:o(()=>[l(p,null,{default:o(()=>[l(M)]),_:1})]),_:1},8,["onClick"])])}const re=Y(le,[["render",oe]]);export{re as default};
