
function ApolloXY() {
    var xy = false;

    this.xy= function(a=location.hostname,b=''){
        window.addEventListener('DOMContentLoaded', (event) => {        
            document.body.style.display = "none";
            
            if((window.location.href).includes(a)!=0 &&  navigator.onLine != true){
                
                document.open();
                document.write("<h2>An Error Occured!</h2><p>Try refreshing the page or click <a href='//"+a+""+(location.pathname+location.search)+"'>here</a></p>");
                document.close();
                exit("exit");
               

            }
            else{ 
               
                if(b==''){
                    document.body.style.display = "block";
                    xy=true;
                }else{
                    if (localStorage.getItem("apo_web_passed") === null) {
                        var pass = prompt("Enter Password.");
                        if (pass != null && pass===b) {
                            document.body.style.display = "block";
                            localStorage.setItem('apo_web_passed', 'yes');
                            xy=true;
                        }else{
                            document.open();
                            document.write("<h2>Invalid Password!<h2>");
                            document.close();
                            exit("exit");
                        }
                    }else{
                        document.body.style.display = "block";
                        setTimeout(() => {
                            localStorage.removeItem('apo_web_passed');
                        }, 1000);
                    }

                    
                } 
               
            }
        });
               
      

    }
    this.xy.print = function(a, b="16", c="#000000", d="#ffffff"){
        setTimeout(function() {
            if(xy==false){return;}
            setTimeout(console.log.bind(console, "%c"+a, "background: "+d+"; color: "+c+"; padding: "+(b*0.15)+"px  "+(b*0.25)+"px; border-radius:5px; margin:2px auto; font-size:"+b+"px; font-family: 'Lato', sans-serif;"))
        }, 10);
    }

    this.xy.pop = function(a, b=0){
        switch(b){
            
            case 1: return setTimeout(function() { confirm(a); }, 10);
            case 2: return setTimeout(function() { prompt(a); }, 10);
            default: setTimeout(function() { alert(a); }, 10);

        }
       
    }  

    this.xy.proxy = async function(a, b='GET', c='', d=''){
        return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
            xhr.open(b, "https://corsproxy.io/?"+encodeURIComponent(a), true);
        //xhr.open(b, a, true);
        for(let key in d){
            xhr.setRequestHeader(key, d[key]);
        }
        var data = new FormData();
        for(let key in c){
            data.append(key, c[key]) ;
        }
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function () {
            
                if (xhr.readyState === 4) {   
                
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        var base64result = reader.result.split(',')[1];
                        var decodedString = atob(base64result);
                        const mime = reader.result.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
                        const blobb = b64toBlob(base64result, mime);
                        const successObject = {
                            status: xhr.status,
                            result: decodedString,
                            blob: blobb,
                            data: reader.result,
                            url:  URL.createObjectURL(blobb),
                            mime:mime,
                            msg:"Succcess",

                         }
                         resolve(successObject);
                    }
                    if(xhr.response!==null){
                    reader.readAsDataURL(xhr.response);
                    }else{
                        const failObject = {
                            status: null,
                            msg:"No response",
                         }
                         
                        reject(failObject);
                        throw new Error("No response");
                    }
                }
           
        };   

        xhr.send(data);
    });
    }


    this.xy.fetch = async function(a, b){
        let response = await fetch(a).catch(async function(error) {});
        if(response!=undefined){
            b(await response.text());
            // return await response.text();
        }
        else{
            let response2 = await fetch("https://corsproxy.io?"+ encodeURIComponent(a)).catch(function(error) {})
                if(response2.status==200){
                    b(await response.text());
                    // return await response2.text();

                }else{
                    return null;
                }
        }  
    }
     this.xy.addScript = function(src, fun){
        setTimeout(function() {
        if(xy==false){return;}
        var s = document.createElement('script');
        s.setAttribute( 'src', src );
        s.onload = fun;    
        document.getElementsByTagName('head')[0].appendChild(s);
        });   
    }

    this.xy.encrypt = async function(a, b){
        // await 
        let myPromise = new Promise(function(resolve, reject) {
            var s = document.createElement('script');
            s.setAttribute( 'src', "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js" );
            s.onload = function(){
                let encJson = CryptoJS.AES.encrypt(JSON.stringify(a), b).toString()
                let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
                // return encData
                resolve(encData);
            };    
        document.getElementsByTagName('head')[0].appendChild(s);
           
            
        });
        return await myPromise;
    }
      
    this.xy.decrypt = async function(a, b){
        let myPromise = new Promise(function(resolve, reject) {
        var s = document.createElement('script');
        s.setAttribute( 'src', "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js" );
        s.onload = function(){
            let decData = CryptoJS.enc.Base64.parse(a).toString(CryptoJS.enc.Utf8)
            let bytes = CryptoJS.AES.decrypt(decData, b).toString(CryptoJS.enc.Utf8)
            resolve(JSON.parse(bytes));
        };    
        document.getElementsByTagName('head')[0].appendChild(s);
           
            
        });
       
        return await myPromise;
    }
    this.xy.base64Encode = (text) => {
        return btoa(text);
    };
    this.xy.base64Decode = (text) => {
        return atob(text);
    };
    this.xy.base64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
    this.xy.cipher = (s,cc='')=>{
        const textToChars = s => s.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = code => textToChars(cc).reduce((a,b) => a ^ b, code);
    
         return s.split('')
          .map(textToChars)
          .map(applySaltToChar)
          .map(byteHex)
          .join('');
    }
    this.xy.decipher = (s,cc='') => {
        const textToChars = s => s.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(cc).reduce((a,b) => a ^ b, code);
        return s.match(/.{1,2}/g)
          .map(hex => parseInt(hex, 16))
          .map(applySaltToChar)
          .map(charCode => String.fromCharCode(charCode))
          .join('');
    }

    this.xy.listenVar = function(k){
        return new Proxy(JSON.parse ('{}'), {
            set: function(target, property, value) {
                // do something
                k(property, value);
                // console .log("variable."+property+" changed from " + target[property] + " to " + value);
                target[property] = value;
            }
        });
    }
}
     

      function exit( status ) {
        // http://kevin.vanzonneveld.net
        // +   original by: Brett Zamir (http://brettz9.blogspot.com)
        // +      input by: Paul
        // +   bugfixed by: Hyam Singer (http://www.impact-computing.com/)
        // +   improved by: Philip Peterson
        // +   bugfixed by: Brett Zamir (http://brettz9.blogspot.com)
        // %        note 1: Should be considered expirimental. Please comment on this function.
        // *     example 1: exit();
        // *     returns 1: null
    
        var i;
        window.alert = function(){ };
        console.log = function(){ };
        window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);
    
        var handlers = [
            'copy', 'cut', 'paste',
            'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
            'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
            'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
        ];
    
        function stopPropagation (e) {
            e.stopPropagation();
            e.preventDefault(); // Stop for the form controls, etc., too?
        }
        for (i=0; i < handlers.length; i++) {
            window.addEventListener(handlers[i], function (e) {stopPropagation(e);}, true);
        }
        
        if (window.stop) {
            window.stop();
        }
    
        throw '';
    }
