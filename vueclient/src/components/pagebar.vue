<template>
		<ul class="pagination">
		    <li :class="{hideLi:current == 1}" @click="goto(current-1)">
		        <a href="javascript:;" aria-label="Previous">
		            <span aria-hidden="true">&laquo;</span>
		        </a>
		    </li>
		    <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <a href="javascript:;" >{{index}}</a>
            </li>
		    <!--<li><a href="javascript:;">10</a></li>-->
		    <li :class="{hideLi:(allpage == current || allpage == 0)}" @click="goto(current+1)">
		        <a href="javascript:;" aria-label="Next">
		        	<span aria-hidden="true">&raquo;</span>
		        </a>
		    </li>
	   </ul>
	   
</template>

<script>
	/*
	 分页组件
	 设置props
	 	current 当前页    默认1
	 	showItem 显示几页	默认5
	 	allpage    共多少页     10
	 	ifEdit/ifDelete/ifUp/ifDown    是否可编辑/删除/上下移动  默认true
	 	
 	 定制模板
 	 	slot为grid-thead 定制表格头部
 	 	slot为grid-handler 定制表格操作
 	 	
 	 监听状态变化
 	 	on-delete 删除
 	 	on-edit   编辑
 	 	on-up     上移
 	 	on-down   下移
 	 	
 	 分页
	 
	**/
	export default {
		name: 'page',
		data () {
			return {}
		},
		props:{
			current:{
				type:Number,
				default:1
			},
			showItem:{
				type:Number,
				default:5
			},
			allpage:{
				type:Number,
				default:10
			}
		},
		computed:{
            pages:function(){
                var pag = [];
                   if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                        //总页数和要显示的条数那个大就显示多少条
                        var i = Math.min(this.showItem,this.allpage);
                        while(i){
                            pag.unshift(i--);
                        }
                    }else{ //当前页数大于显示页数了
                        var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                            i = this.showItem;
                        if( middle >  (this.allpage - this.showItem)  ){
                            middle = (this.allpage - this.showItem) + 1
                        }
                        while(i--){
                            pag.push( middle++ );
                        }
                    }
                return pag
            }
        },
		methods:{
			/*editHandler(item){
				this.$emit("on-edit",item);
			}*/
			goto:function(index){
				if(index == this.current) return;
					//this.current = index;
					//这里可以发送ajax请求
					this.$emit("on-gopage",index);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*分页*/
	.pagination{
		margin: 10px;
		display: inline-block;
	}
	.pagination >li{
		display: inline;
	}
	.pagination>li>a, .pagination>li>span{
	    float: left;
	    padding: 6px 12px;
	    margin-left: -1px;
	    line-height: 1.42857143;
	    color: #4187db;
	    text-decoration: none;
	    background-color: #fff;
	    border: 1px solid #f8f9fb;
	}

	.pagination>li>a:hover{
		background-color: #f8f9fb;
	}
	.pagination>.active>a{
		background-color: #4187db !important;
		color: #fff;
	}
	.hideLi a{
		visibility: hidden;
	}
</style>
