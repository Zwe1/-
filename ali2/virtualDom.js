// 2. 实现一个虚拟dom的diff算法，伪代码即可。(25分钟)

/**
*  interface  Node  {
*  type: string;
*    props: {[k: string]: v};
*    children: any[];
*  }
* 
*/

const transformDataToElement = (ele, virtualDom) => {
    //  进行dom操作，将virtualDom data转换为实际dom
       // ele为实施操作的dom基准节点, virtualDom为包含type,children?,props?的基本数据单元
    }
    
    const typeIsEqual  = (t1,  t2) => t1  ===   t2;
    
    const transformProps = (p1,  p2)  =>  {
       const patch  = p1;
    for (let k  in p2) {
         if (p2.hasOwnProperty(k)) {
                // 是否新增属性 
             if  (!p1.hasOwnProperty(k)){
                  patch[k] = p2;
                } else  {
                   //  是否变更了属性值
                 if  (p2[k] !== p1[k]) {
                     patch[k]  = p2[k]'
                    }
                } 
               if （） {
                  // 是否删除了属性 
                }
            }
        }
        return patch;
    }
    
    const compare = (oldTree, newTree, creation =  {})  =>  {
    
        
       const { type, props, children =  [] } = oldTree;
       const { nType, nProps, nChildren =  []} = newTree;
      
        // 1. 比较类型 
       if (!typeIsEqual(type, nType)) {
       newTree
       }  else {
         creation.type =  nType;
        }
      
      
      // 2. 比较属性  
      creation.props  = transformProps(props, nProps);
      
       // 3. 比较children, 其中应该包含key比较的算法优化
       const totalLength = _.max(children.length, nChildren.length)
        compare.children  =  new Array(totalLength).fill(null).map((v, i) => compare(children[i], nChildren[i]))
      
       return creation 
    }
    
    const diff = (oldTree,  newTree, root) => {
       // 得到更新后的virtualDomTree
    const newDomTree = compare(oldTree, newTree);
       //  在渲染节点进行更新
       //  树可能没变化
       if  (tree have updated) {
          transformDataToElement(root, newDomTree)
        }
    }
    