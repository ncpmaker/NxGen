import{u as b,r as n,c as p,a as m,w as x,b as u,d as _,e as t,o as d,f as V,g as h,t as y}from"./index-kbSjY7Dn.js";const k={class:"flex h-[100svh] w-screen flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-400"},B={class:"flex w-full max-w-[600px] flex-col gap-2"},L=m("h1",{class:"px-4"},"NCP Administrator Login",-1),S={key:1},P={__name:"LoginPage",setup(C){const i=b(),f=n(null),s=n({username:null,password:null}),e=n({username:{message:null,color:null},password:{message:null,color:null}}),o=n(!1);async function v(){o.value=!0,e.value.username.message=null,e.value.username.color=null,e.value.password.message=null,e.value.password.color=null,await h({method:"post",url:"https://ncp-api-uzr5.onrender.com/admin/login",data:{username:s.value.username,password:s.value.password}}).then(l=>{localStorage.setItem("ncpadmin_token",l.data.adminToken),o.value=!1,i.push({name:"admin dashboard"}),y.add({msg:"Successfully logged in",duration:2e3})}).catch(l=>{l.response.status===400&&(e.value.username.message="Wrong username or password",e.value.username.color="error",e.value.password.message=null,e.value.password.color="error"),l.response.status===401&&(e.value.username.message=null,e.value.username.color=null,e.value.password.message="Wrong password",e.value.password.color="error")}).finally(()=>o.value=!1)}return(l,a)=>{const c=t("VFormTextbox"),g=t("VLoader"),w=t("VButton");return d(),p("div",k,[m("div",B,[L,m("form",{onSubmit:a[2]||(a[2]=x(r=>v(),["prevent"])),ref_key:"formRef",ref:f,class:"flex w-full flex-col gap-2 rounded-2xl bg-blue-50 px-4 py-4 shadow-lg"},[u(c,{modelValue:s.value.username,"onUpdate:modelValue":a[0]||(a[0]=r=>s.value.username=r),color:e.value.username.color,"sub-label":e.value.username.message,label:"Username",type:"text"},null,8,["modelValue","color","sub-label"]),u(c,{modelValue:s.value.password,"onUpdate:modelValue":a[1]||(a[1]=r=>s.value.password=r),color:e.value.password.color,"sub-label":e.value.password.message,label:"Password",type:"password"},null,8,["modelValue","color","sub-label"]),u(w,{disabled:o.value,class:"justify-center",type:"submit"},{default:_(()=>[o.value?(d(),V(g,{key:0,size:"16px",thickness:"2px"})):(d(),p("span",S,"Login"))]),_:1},8,["disabled"])],544)])])}}};export{P as default};
