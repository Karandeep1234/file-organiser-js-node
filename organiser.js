#!/usr/bin/env node

let fs=require("fs");
let path=require("path");

(function(){
    let cmd=process.argv;
    
    cmd=cmd.slice(2);
    
    //handling invalid arguments
    if(cmd.length !==0){
        console.log("Usage: organise");
        return;
    }
    
    try {
        // reading current directory
        files = fs.readdirSync(__dirname);

        for(let i=0;i<files.length;i++){
            // if folder encountered
            if(path.extname(files[i])===""){
                continue;
            }
            //if file encountered with extension whose folder is already present
            else if(fs.existsSync(`${path.extname(files[i])}-Folder`)){
                
                let dest=path.join(`${path.extname(files[i])}-Folder`.toString(),files[i]);
                
                fs.renameSync(files[i], dest, function (err) {
                    if (err) throw err
                    console.log(`Successfully moved - ${files[i]}`)
                  })

            }else{
                //if file encountered with extension whose folder is not present
                fs.mkdirSync(`${path.extname(files[i])}-Folder`);
                
                let dest=path.join(`${path.extname(files[i])}-Folder`.toString(),files[i]);
                
                fs.renameSync(files[i], dest, function (err) {
                    if (err) throw err
                    console.log(`Successfully moved - ${files[i]}`)
                  })
            }
        }

        
    } catch (error) {
        console.log("Some Error Occured");
        return;
    }
    
    console.log("success!");

})();