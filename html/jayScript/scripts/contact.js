		var alert_box = document.getElementById("alertBox");
		var alert_mesg = document.getElementById('alertMesg');
		var submit_mesg = document.getElementById('submitMesg');
		submit_mesg.addEventListener("click",valid_submit);
		function valid_name(){
			var str = document.getElementById("name").value;
			if (!str){
				alert_mesg.innerHTML = "请填写此字段。";
				alert_box.style.left = 160+'px';
				alert_box.style.top = 411+'px';
				alert_timer();
				return false;
			}else{
				return true;
			}
		}
		function valid_email(){
			var str = document.getElementById("email").value;
			//var str1 = str.indexOf("@");
			var v_RegExp = /\w+@\w+\.[a-zA-Z.]+/
			var flag = v_RegExp.test(str);
			if (!flag){
				alert_mesg.innerHTML = "请输入正确的邮箱。";
				alert_box.style.left = 180+'px';
				alert_box.style.top = 475+'px';
				alert_timer();
				return false;
			}else{
				return true;
			}
		}
		function valid_message(){
			var str = document.getElementById("message").value;
			if (!str){
				alert_mesg.innerHTML = "请填写此字段。";
				alert_box.style.left = 380+'px';
				alert_box.style.top = 575+'px';
				alert_timer();
				return false;
			}else{
				return true;
			}
		}
		function valid_submit(){
			var a = valid_message();
			var b = valid_email();
			var c =valid_name();
			if(a&&b&&c){
				alert("信息提交成功，谢谢！");
				return true;
			}else{
				return false;
			}
		}
		function alert_timer(){
			var t=5;
			setInterval(function(){
				if(t<0){
					alert_box.style.display = 'none';
				}else{
					alert_box.style.display = 'block';
				}
				t--;
			},1000)
		}