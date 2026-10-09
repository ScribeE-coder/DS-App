class Node {
    constructor(key) {
        this.key = key 
        this.left = null
        this.right = null
    }
}

class ternaryNode {
    constructor(key) {
        this.key = key 
        this.left = null 
        this.right = null 
        this.middle = null
        this.isEnd = false
    }
}

class BST {
    constructor() {
        this.rootNode = null; 
        this.size = 0; 
        this.listy = []; 
    }

    add(item) {
        if (!Number.isInteger(item)) {
            console.error("Parameter is the wrong data type")
            return
        }

        if (this.listy.includes(item)) {
            return; 
        }

        var curr = this.rootNode 
        var node = new Node(item)
        var parent = null 
        
        // if there is no parent, add must be a root
        if (curr === null) {
            this.rootNode = new Node(item); 
            this.size += 1; 
            this.listy.push(item); 
            return; 
        }

        while (curr != null) {
            parent = curr

            if (item < curr.key) {
                curr = curr.left
            } else if (item > curr.key) {
                curr = curr.right
            }
        }

        if (item < parent.key) {
            parent.left = node 
        } else if (item > parent.key) {
            parent.right = node
        }
        this.size += 1
        this.listy.push(item); 
        return
    }

    remove(item) {
        if (!Number.isInteger(item)) {
            console.error("Wrong data type, pls give me a number")
            return
        }

        var curr = this.rootNode
        var parent = null 

        while (curr != null && curr.key != item) {
            parent = curr
            if (item < curr.key) {
                curr = curr.left
            } else {
                curr = curr.right
            }
        }

        if (curr === null) {
            console.error("That item is not in this tree")
            return
            // else case: rootNode is being deleted and has one child or no children
        } else if (parent === null && !(curr.right && curr.left)) {
            if (curr.left) {
                this.rootNode = curr.left
            } else if (curr.right) {
                this.rootNode = curr.right
            } else {
                this.rootNode = null
            }
            let i = this.listy.indexOf(item);
            if (i > -1) this.listy.splice(i, 1);
            this.size -= 1;
            return; 
        }
        // node that matches item is a leaf 
        if (!curr.left && !curr.right) {
            if (curr === parent.left) {
                parent.left = null
            } else {
                parent.right = null
            }
        // node that matches item has one child
        } else if (!curr.left || !curr.right) {
            if (curr === parent.left) {
                if (curr.left) {
                    parent.left = curr.left
                } else if (curr.right) {
                    parent.left = curr.right
                }
            } else if (curr === parent.right) {
                if (curr.left) {
                    parent.right = curr.left
                } else if (curr.right) {
                    parent.right = curr.right
                }
            }
        // node that matches item has two children
        } else {
            var successorParent = curr 
            var successor = curr.right
            
            while (successor.left) {
                successorParent = successor 
                successor = successor.left
            }
            // replace the value 
            curr.key = successor.key

            // delete successor 
            if (successorParent.left === successor) {
                successorParent.left = successor.right
            } else {
                successorParent.right = successor.right
            }
        }

        let i = this.listy.indexOf(item); 
        if (i > -1) {
            this.listy.splice(i, 1); 
        }
        this.size -= 1; 
        return;
    }
    
    // find smallest element in the tree
    findMin() {
        if (!this.rootNode) {
            console.error("Can't find minimum element in an empty tree"); 
            return; 
        }
        
        let curr = this.rootNode
        while (curr.left != null) {
            curr = curr.left
        }
        return curr 
    }

    // find largest element in the tree
    findMax() {
        if (!this.rootNode) {
            console.error("Can't find maximum element in an empty tree."); 
            return; 
        }
        
        let curr = this.rootNode
        while (curr.right != null) {
            curr = curr.right
        }
        return curr;
    }

    BSTsize() {
        return this.size;
    }
}

bst = new BST(); 
bst.add(5); 
bst.add(6); 
console.log(bst.findMin()); 

class ternaryTree {
    constructor() {
        this.rootNode = null; 
        this.size = 0; 
        this.word_list = []; 
    }

    add(word) {
        this.rootNode = this.addHelper(this.rootNode, word, 0); 
        this.word_list.push(word); 
        this.size += 1; 
    }

    addHelper(node, word, index) {
        if (node === null) {
            let char = word[index]
            let newNode = new ternaryNode(char);
            node = newNode;  
        }

        if (word[index] > node.key) {
            node.right = this.addHelper(node.right, word, index); 
        }
        else if (word[index] < node.key) {
            node.left = this.addHelper(node.left, word, index); 
        }
        else if (word[index] === node.key) {
            if (index == word.length - 1) {
                node.isEnd = true; 
                return node
            }
            // middle branches of tree determine end of current word so index is only moved here
            node.middle = this.addHelper(node.middle, word, index += 1); 
        }
        return node; 
    }

    remove(word) {
        if (!this.word_list.includes(word)) {
            console.error("This word is not in this TST"); 
            return; 
        }
        let curr = this.rootNode; 
        let parent = null; 
        let index = 0; 
        while (curr != null) {
            if (index > (word.length - 1)) {
                break; 
            }
            parent = curr; 
            if (word[index] > curr.key) {
                curr = curr.right; 
            }
            else if (word[index] < curr.key) {
                curr = curr.left; 
            }
            else {
                curr = curr.middle;
                index += 1;  
            }
        }

        parent.isEnd = false; 
        let splice = this.word_list.indexOf(word);
        this.word_list.splice(splice, 1); 
        this.size -= 1; 
        return; 
    }

    search(word) {
       for (const item of this.word_list) {
        if (item == word) {
            return item; 
        }
       }
       console.error("This item is not in the current tree.")
        return; 
    }

    sizeofTree() {
        return this.size; 
    }
}
