window.onload = function(){

    //获取变量
    var box = document.getElementById('box');
    var midBox = document.getElementById('midbox');
    var mImg = midBox.children[0];
    var mask = document.getElementById('mask');
    var bigBox = document.getElementById('bigbox');
    var bigPic = bigBox.children[0];
    var list = document.getElementById('list');
    var sImg = list.children;

    midBox.onmouseover = function(){
        //鼠标进入，图像显示
        mask.style.display = 'block';
        bigBox.style.display = 'block';

        //鼠标移动，黄色方块跟随移动
        midBox.onmousemove = function(event){
            var event = event || window.event;

            //直接用even.offsetX会出问题，为什么？
            // var X = event.offsetX - mask.offsetWidth*0.5;
            // var Y = event.offsetY - mask.offsetHeight*0.5;

            var pointX = event.clientX - midBox.offsetParent.offsetLeft - mask.offsetWidth * 0.5;
            var pointY = event.clientY - midBox.offsetParent.offsetTop - mask.offsetHeight * 0.5;

            //注意，要先在css里面将midbox宽度定义，不然这里的offsetwidth会出问题
            console.log(midBox.offsetHeight - mask.offsetHeight,midBox.offsetWidth - mask.offsetWidth,pointX);
            console.log('offsetwidth',midBox.offsetWidth,mask.offsetWidth);
            
            if(pointX < 0){
                pointX = 0;
            }else if(pointX >= midBox.offsetWidth - mask.offsetWidth){
                pointX = midBox.offsetWidth - mask.offsetWidth;
            }

            if(pointY < 0){
                pointY = 0;
            }else if(pointY >= midBox.offsetHeight - mask.offsetHeight){
                pointY = midBox.offsetHeight - mask.offsetHeight;
            }

            mask.style.left = pointX + 'px';
            mask.style.top = pointY + 'px';

            /*
            smallX / bigX = smallBox.width / 大图的宽度
            bigX = smallX / ( smallBox.width / 大图的宽度 )
            */

            var bigX = - pointX/(midBox.offsetWidth/bigBox.offsetWidth);
            var bigY = - pointY/(midBox.offsetHeight/bigBox.offsetHeight);

            //大图移动
            bigPic.style.left = bigX + 'px';
            bigPic.style.top = bigY + 'px';
            
        }
    }

    midBox.onmouseout = function(){
        mask.style.display = 'none';
        bigBox.style.display = 'none';
    }

    for(var i = 0; i<sImg.length; i++){
        var img = sImg[i];
        img.index = i;
        img.onclick = function(){
            mImg.src = 'images/pic00' + (this.index + 1) + '.jpg';
            bigPic.src = 'images/pic0' + (this.index + 1) + '.jpg';
        }
    }
}