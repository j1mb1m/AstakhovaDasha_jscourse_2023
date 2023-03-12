 var array = [5, 7,
    [4, [2], 8, [1, 3], 2],
    [9, []],
    1, 8]; 


function calc() {
    alert(treeSum(array));
}

function treeSum(args) {
    let result = 0;
    
    for (var i = 0; i < args.length; i++) {
        if (Array.isArray(args[i])) {
            result += treeSum(args[i]);
        }
        else {
            result += args[i];
        }
    }

    return result;
}