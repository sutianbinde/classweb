<template>
	<div class="">
		
		<table border="" cellspacing="" cellpadding="">
			<thead>
				<tr><th>序号</th>
					<th v-for="(item, index) in theadData">{{item.title}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="!listData.length">
					<td>1</td><td>没有数据 . . .</td>
					<td v-for="(item, index) in theadData" v-if="index<=theadData.length-2"></td>
				</tr>
				<tr v-for="(item, index) in listData">
					<td>{{index+1}}</td>
					<!--按照头部的-->
					<td  v-for="(item2, index2) in theadData">
						<span v-if="index2 === 0" style="float: right;">
							<i title="编辑" v-if="ifEdit" class="fa fa-edit" aria-hidden="true" @click="editHandler(item)"></i>
							<i title="删除" v-if="ifDelete" class="fa fa-trash" aria-hidden="true" @click="deleteHandler(item)"></i>
							<i title="下移" v-if="ifDown" class="fa fa-arrow-circle-o-down" aria-hidden="true" @click="downHandler(item)"></i>
							<i title="上移" v-if="ifUp" class="fa fa-arrow-circle-o-up" aria-hidden="true" @click="upHandler(item)"></i>
							<i title="封号"v-if="ifReset" class="fa fa-unlock-alt" aria-hidden="true" @click="resetHandler(item)"></i>
						</span>
						{{item[item2.keyname]}}
					</td>
				</tr>
				
			</tbody>
		</table>
		
		<pagebar v-if="ifpage" :current="pageInfo.current" :showItem="pageInfo.showItem" :allpage="pageInfo.allpage" @on-gopage="gopage"></pagebar>
	</div>
</template>

<script>
	/*
	 表格组件
	 设置props
	 	theadData 表头数据    默认[]
	 	listData 表格数据	默认[]
	 	ifpage    是否分页     默认true
	 	ifEdit/ifDelete/ifUp/ifDown    是否可编辑/删除/上下移动  默认false
	 	
 	 定制模板
 	 	slot为grid-thead 定制表格头部
 	 	slot为grid-handler 定制表格操作
 	 	
 	 监听状态变化
 	 	on-delete 删除
 	 	on-edit   编辑
 	 	on-up     上移
 	 	on-down   下移
 	 	
 	 分页
 	 pageInfo 分页信息如下  默认{}   --  或者单独使用 pagebar.vue
 	 {
 	 	current:当前第几页     1
 	 	showItem：显示多少页 5
 	 	allpage:共多少页        10
 	 }
	 
	**/
	
	import pagebar from './pagebar.vue'
	export default {
		name: 'grid',
		data () {
			return {
	
			}
		},
		props:{
			listData:{
				type:Array,
				default:function(){
					return [{
						name:"没有数据 . . ."
					}]
				}
			},
			theadData:{
				type:Array,
				default:function(){
					return [{
						title:"名字",
						keyname:"name"
					}]
				}
			},
			ifpage:{
				type:Boolean,
				default:true
			},
			ifEdit:{
				type:Boolean,
				default:false
			},
			ifDelete:{
				type:Boolean,
				default:false
			},
			ifUp:{
				type:Boolean,
				default:false
			},
			ifDown:{
				type:Boolean,
				default:false
			},
			ifReset:{
				type:Boolean,
				default:false
			},
			pageInfo:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		methods:{
			editHandler(item){
				this.$emit("on-edit",item);
			},
			deleteHandler(item){
				this.$emit("on-delete",item);
			},
			downHandler(item){
				this.$emit("on-down",item);
			},
			upHandler(item){
				this.$emit("on-up",item);
			},
			resetHandler(item){
				this.$emit("on-reset",item);
			},
			gopage(index){
				this.$emit("on-gopage",index);
			}
		},
		components:{pagebar}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	table{
		border: none 0;
		border-collapse: collapse;
		color: #51555a;
		width: 100%;
		border-bottom: 1px solid #DFE3EA;
	}
	td, th{
		padding: 10px 20px;
		text-align: left;
		border-width:0;
	}
	thead tr, tr:nth-of-type(even){
		background: #f8f9fb;
	}
	/*tbody tr:hover{
		background: #f4f6fb;
	}*/
	td .fa{
		padding:0 5px;
		cursor: pointer;
		opacity: 0;
		transition: all 0.3s ease;
	}
	td .fa:first-child{
		margin-left: 10px;
	}
	tr:hover .fa{
		opacity: 1;
	}
	td .fa:hover{
		color: #4187db;
		transform: scale(1.2);
	}
	
	
</style>
