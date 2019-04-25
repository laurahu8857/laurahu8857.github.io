//$ function 會等document ready後會開始跑
// $ 是jquery的fuction , document.getElementID.get(XXX)
// 匿名函式

// element取值
let name;
let email;
let phone;
let bdy;
let bdm;
let bdd;
let gender;
let games;
let note;

$(function(){
    // send btn 
    $("#send").click(function(e){send(e);});
}
)

function send(e)
{
    // 瀏覽器 default行為： form 按下btn時會reload, 這邊是避免reload發生
   e.preventDefault();

   let allpass = true
    //重按send時 ,把原本error class （error message) 移除   
   $(".is-invalid").removeClass("is-invalid");
   $("#check_games_invalid").hide();

    name = $("#input_name").val();
    email = $("#input_email").val();
    phone = $("#input_phone").val();
    bdy = $("#sel_bdy").val();
    bdm = $("#sel_bdm").val();
    bdd = $("#sel_bdd").val();
    gender = $("input[name='radio_gender']:checked").val();
    games = [];
    $.map($("input[name='check_games']:checked"), function (el) {
        games.push($(el).val())
        })
    note = $("#text_note").val();

   console.log("=====after click button===")
   console.log("name is: " + name);
   console.log("email is: " + email);
   console.log("bd is: " + bdy + "-" + bdm + "-" + bdd);
   console.log("gender is: " + gender);
   console.log("games is: " + games);
   console.log("note is: " + note);


//    判斷 name is "", 給warning word
   if (name=="")
   {
       $("#input_name").addClass("is-invalid");
       allpass = false;
   }
//    判斷 email is "", 給warning word
   if (email=="")
   {
       $("#input_email").addClass("is-invalid");
       allpass = false;
   }

   if(phone=="")
   {
    $("#input_phone").addClass("is-invalid");
    allpass = false;
   }
   if(bdy=="")
   {
        $("#sel_bdy").addClass("is-invalid");
        allpass = false;
   }

   if(bdm=="")
   {
        $("#sel_bdm").addClass("is-invalid");
        allpass = false;
   }
   
   if(bdd=="")
   {
        $("#sel_bdd").addClass("is-invalid");
        allpass = false;      
   }
   if(games.length==0){
        $("input[name='check_games']").addClass("is-invalid");

        // 因為bootrap 一個error 只能for 一個element,但多選是多個element
        // 所以只能強制讓這一行show 出來
        $("#check_games_invalid").show();
   }
}


