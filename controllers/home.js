
module.exports=function(async,Club,_,){

   return{
       SetRouting:function(router){
        router.get('/home',this.homePage); 
       
       },

       homePage: function(req,res){
        async.parallel(
            [
                function(callback) {
                    Club.find({}, (err, result) => {
                        callback(err, result);
                    });
                },
			],(err,results)=>{
				const res1=results[0];
				res.render('home',{title:"Footballlkik-Home",data:res1})
			})   
		}
	}    
		}
		