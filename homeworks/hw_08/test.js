describe('squareRoots - функция нахождения корней квадратного уравнения', function() {

    const testSet=[
      {a:1, b:-2,c:-3, roots:[3,-1] },
      {a:1, b:12,c:36, roots:[-6]   },
      {a:1, b:1, c:1,  roots:[]     },
      {a:-1,b:-2,c:15, roots:[-5,3] },    
      {a:0, b:5,c:-10, roots:[2] },
         {a:0, b:0,c:0, roots:[] },  
          {a:0, b:0,c:1, roots:[] },
          {a:0, b:1,c:0, roots:[-0] },
          {a:0, b:1,c:1, roots:[-1] },
          {a:1, b:0,c:0, roots:[-0] },
          {a:1, b:0,c:1, roots:[] },
          {a:1, b:1,c:0, roots:[0, -1] },
    ];

    for ( let test of testSet ) {
      it(`находит корни при a=${test.a} b=${test.b} c=${test.c} и они равны [${test.roots.join(",")}]`, function(){
          const roots=squareRoots(test.a,test.b,test.c);
          assert.deepEqual(roots,test.roots);
      });
    }

  });