import{_ as W,u as q,r as k,h as Y,g as z,t as E,o as s,c as l,a as e,i as P,n as C,b as m,j as H,k as se,d as B,l as N,v as F,m as a,f as U,s as K,p as R,e as T,q as le,x as ne,y as J,F as o,z as v,A as n,B as Q,C as oe,D as ae,T as X,E as Z,K as re}from"./index-rK9W7_2a.js";const O=G=>(le("data-v-3a90d06c"),G=G(),ne(),G),ie={key:0,class:"sticky top-0 z-20 grid grid-cols-3 items-center border-b bg-blue-50 px-6 py-2 shadow-lg"},ce={class:"flex flex-row items-center justify-center gap-2"},de=O(()=>e("span",{class:"material-icons text-3xl"}," space_dashboard ",-1)),ue=[de],_e=O(()=>e("span",{class:"material-icons text-3xl"}," history ",-1)),pe=[_e],he=O(()=>e("span",{class:"material-icons text-3xl"}," timeline ",-1)),be=[he],xe={class:"flex flex-row items-center justify-end gap-4"},ve={class:"flex grow flex-col items-center"},ge={class:"flex flex-col gap-2 p-4"},me={class:"flex flex-row items-center justify-between"},fe=O(()=>e("h2",null,"Settings",-1)),we={class:"flex flex-row items-center justify-between px-6"},ye=O(()=>e("h3",null,"Enable Post Test",-1)),ke={class:"flex flex-row gap-2"},$e={class:"flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"},Ae={class:"flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"},Ce={class:"flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"},Te={class:"flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"},Ve={key:1},Se=O(()=>e("hr",{class:"m-2 border-stone-400"},null,-1)),je={key:1},De={__name:"TheNavbar",setup(G){const V=q(),i=k({settingsModal:!1,settingsToggle(){this.settingsModal=!this.settingsModal}});function A(){R.set(0),V.push({name:"admin dashboard"})}const $=k(!1);async function M(){$.value=!0,await z({method:"delete",url:"https://nxgen-backend.onrender.com/api/v2/admin/logout",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"}}).then(()=>{Object.keys(localStorage).forEach(function(p){/^ncpadmin_/.test(p)&&localStorage.removeItem(p)}),V.push({name:"admin login"}),R.set(0),E.add({msg:"Logged out successfully.",duration:4e3})}).catch(p=>{p.response.status==401?V.push({name:"admin login"}):E.add({msg:p.response.data,duration:4e3})}).finally(()=>$.value=!1)}const j=k(!1),f=k({A1:!1,B1:!1,C1:!1,D1:!1});Y(async()=>{await z({method:"get",url:"https://nxgen-backend.onrender.com/api/v2/enable-post-test",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"}}).then(p=>{f.value.A1=p.data.A1,f.value.B1=p.data.B1,f.value.C1=p.data.C1,f.value.D1=p.data.D1}).catch(p=>{p.response.status==401?V.push({name:"admin login"}):E.add({msg:p.response.data,duration:4e3})})});async function S(){j.value=!0,await z({method:"post",url:"https://nxgen-backend.onrender.com/api/v2/enable-post-test",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"},data:{A1:f.value.A1,B1:f.value.B1,C1:f.value.C1,D1:f.value.D1}}).then(()=>{E.add({msg:"Post test availablity updated",duration:4e3})}).catch(p=>{p.response.status==401?V.push({name:"admin login"}):E.add({msg:p.response.data,duration:4e3})}).finally(()=>j.value=!1)}return(p,h)=>{const I=T("VIconButton"),d=T("VLoader"),w=T("VButton"),L=T("VModal");return s(),l("div",{class:C([{"overflow-y-scroll":p.$route.name!=="admin login"},"flex h-[100svh] flex-col"]),ref_key:"scrollStore",ref:K},[p.$route.name!=="admin login"?(s(),l("div",ie,[e("div",null,[e("button",{onClick:h[0]||(h[0]=r=>A()),class:"text-2xl"},"NxGen Admin")]),e("div",ce,[e("button",{onClick:h[1]||(h[1]=r=>P(R).set(0)),class:C([[P(R).index===0?"active":""],"relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"])},ue,2),e("button",{onClick:h[2]||(h[2]=r=>P(R).set(1)),class:C([[P(R).index===1?"active":""],"relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"])},pe,2),e("button",{onClick:h[3]||(h[3]=r=>P(R).set(2)),class:C([[P(R).index===2?"active":""],"relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"])},be,2)]),e("div",xe,[m(I,{onClick:h[4]||(h[4]=r=>i.value.settingsToggle()),variant:"ghost",size:"lg",icon:"settings"})])])):H("",!0),e("div",ve,[se(p.$slots,"default",{},void 0,!0)]),m(L,{"go-open":i.value.settingsModal,"onUpdate:goOpen":h[12]||(h[12]=r=>i.value.settingsModal=r),"click-outside":!1},{default:B(()=>[e("div",ge,[e("div",me,[fe,m(I,{onClick:h[5]||(h[5]=r=>i.value.settingsToggle()),variant:"ghost",size:"lg",icon:"close"})]),e("div",we,[e("div",null,[ye,e("div",ke,[e("label",$e,[N(e("input",{"onUpdate:modelValue":h[6]||(h[6]=r=>f.value.A1=r),type:"checkbox",class:"cursor-pointer"},null,512),[[F,f.value.A1]]),a(" 1A ")]),e("label",Ae,[N(e("input",{"onUpdate:modelValue":h[7]||(h[7]=r=>f.value.B1=r),type:"checkbox",class:"cursor-pointer"},null,512),[[F,f.value.B1]]),a(" 1B ")]),e("label",Ce,[N(e("input",{"onUpdate:modelValue":h[8]||(h[8]=r=>f.value.C1=r),type:"checkbox",class:"cursor-pointer"},null,512),[[F,f.value.C1]]),a(" 1C ")]),e("label",Te,[N(e("input",{"onUpdate:modelValue":h[9]||(h[9]=r=>f.value.D1=r),type:"checkbox",class:"cursor-pointer"},null,512),[[F,f.value.D1]]),a(" 1D ")])])]),m(w,{onClick:h[10]||(h[10]=r=>S()),disabled:j.value,class:"w-[81px] justify-center"},{default:B(()=>[j.value?(s(),U(d,{key:0,size:"16px",thickness:"2px"})):(s(),l("span",Ve,"Update"))]),_:1},8,["disabled"])]),Se,m(w,{onClick:h[11]||(h[11]=r=>M()),disabled:$.value,color:"warning",class:"justify-center"},{default:B(()=>[$.value?(s(),U(d,{key:0,size:"16px",thickness:"2px"})):(s(),l("span",je,"Logout"))]),_:1},8,["disabled"])])]),_:1},8,["go-open"])],2)}}},Be=W(De,[["__scopeId","data-v-3a90d06c"]]);function ee(G,V=500){let i;return function(...A){clearTimeout(i),i=setTimeout(()=>{G(...A)},V)}}const Le={class:"w-full"},Ge={class:"sticky top-[68.5px] flex w-full flex-row items-center gap-6 bg-blue-50 px-4 py-2"},Ie=e("h3",null,"Test History",-1),Me={class:"flex flex-row items-center gap-2"},Re=e("span",{class:"text-sm text-neutral-600 lg:text-base"},"Section",-1),Ee={class:"flex flex-row items-center gap-2"},Pe=e("span",{class:"text-sm text-neutral-600 lg:text-base"},"Type",-1),ze={class:"w-full table-fixed"},Ue=e("tr",{class:"sticky top-[138px] bg-blue-200"},[e("th",{class:"w-16"},"#"),e("th",{class:"px-6 py-4 text-start"},"Name"),e("th",{class:"px-6 py-4 text-start"},"Section"),e("th",{class:"px-6 py-4 text-start"},"Type"),e("th",{class:"px-6 py-4 text-start"},"Score"),e("th",{class:"px-6 py-4 text-start"},"Date Taken"),e("th",{class:"px-6 py-4"},"Answers")],-1),Ne={key:0},Oe={colspan:"7"},Fe={class:"flex w-full items-center justify-center py-6"},He={class:"w-16 text-center"},qe={class:"max-w-[200px] truncate px-6 py-1 text-start"},Ye={class:"px-6 py-1 text-start"},Ke={class:"px-6 py-1 text-start"},We={class:"px-6 py-1 text-start"},Je={class:"px-6 py-1 text-start"},Qe={class:"px-6 py-1"},Xe={class:"flex h-full w-full flex-row items-center justify-center"},Ze={key:2},et=e("td",{colspan:"7"},[e("div",{class:"flex w-full items-center justify-center py-6"},"No entries found")],-1),tt=[et],st={colspan:"7"},lt={class:"flex w-full items-center justify-center py-6"},nt={class:"flex max-h-[calc(100svh-32px)] flex-col overflow-y-auto overflow-x-hidden px-4 pb-4"},ot={class:"sticky top-0 flex flex-row items-center justify-between bg-blue-50 py-4"},at=e("h2",{class:"leading-none"},"Answers",-1),rt={class:"max-w-[560px]"},it={clas:"flex flex-col gap-1"},ct={key:0},dt={key:1},ut=e("hr",{class:"mx-2 my-4 border-neutral-300"},null,-1),_t={__name:"TestHistoryTab",setup(G){const V=q(),i=k([]),A=k([]),$=k(!0),M=k(!0),j=k(null),f=k(null),S=k({text:"",section:"All",type:"All"}),p=ee(async(d,w,L)=>{(A.value.length===50||A.value.length===0)&&await z({method:"get",url:"https://nxgen-backend.onrender.com/api/v2/history/test/search",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"},params:{search:d,section:w,testType:L==="Pre test"?"PRETEST":L==="Post test"?"POSTTEST":"All",cursor:f.value}}).then(r=>{A.value=r.data,i.value.push(...A.value),$.value=!1,r.data.length>0&&(f.value=r.data[r.data.length-1].id),r.data.length<50&&(M.value=!1)}).catch(r=>{r.response.status==401?V.push({name:"admin login"}):E.add({msg:r.response.data,duration:4e3})}).finally(()=>$.value=!1)});Y(()=>{J(()=>{A.value=[],i.value=[],$.value=!0,f.value=null,p(S.value.text,S.value.section,S.value.type)});let d=!1;K.value.addEventListener("scroll",()=>{let w=window.innerHeight;j.value.getBoundingClientRect().top+j.value.offsetHeight/2<w&&!d&&(window.requestAnimationFrame(async()=>{p(),d=!1}),d=!0)})});const h=k({answers:null,name:"",testType:""}),I=k({showAnswersModal:!1,showAnswersOpen(d,w,L){h.value={answers:d,name:w,testType:L},this.showAnswersModal=!0},showAnswersClose(){this.showAnswersModal=!1}});return(d,w)=>{const L=T("VFormTextbox"),r=T("VSelect"),y=T("VLoader"),D=T("VButton"),_=T("VIconButton"),g=T("VModal");return s(),l("div",Le,[e("div",Ge,[Ie,m(L,{modelValue:S.value.text,"onUpdate:modelValue":w[0]||(w[0]=x=>S.value.text=x),placeholder:"Search for Name",class:"w-72"},null,8,["modelValue"]),e("div",Me,[Re,m(r,{modelValue:S.value.section,"onUpdate:modelValue":w[1]||(w[1]=x=>S.value.section=x),options:["All","1A","1B","1C","1D"],class:"w-20"},null,8,["modelValue"])]),e("div",Ee,[Pe,m(r,{modelValue:S.value.type,"onUpdate:modelValue":w[2]||(w[2]=x=>S.value.type=x),options:["All","Pre test","Post test"],class:"w-32"},null,8,["modelValue"])])]),e("table",ze,[Ue,$.value?(s(),l("tr",Ne,[e("td",Oe,[e("div",Fe,[m(y,{size:"40px",thickness:"2px"})])])])):i.value.length>0?(s(!0),l(o,{key:1},v(i.value,(x,u)=>(s(),l("tr",{key:u,class:"text-center odd:bg-blue-100"},[e("td",He,n(u+1),1),e("td",qe,n(x.name),1),e("td",Ye,n(x.section),1),e("td",Ke,n(x.testType),1),e("td",We,n(x.score),1),e("td",Je,n(new Date(x.dateTaken).toLocaleString().replace(","," -")),1),e("td",Qe,[e("div",Xe,[m(D,{onClick:b=>I.value.showAnswersOpen(x.answers,x.name,x.testType),variant:"filled","start-icon":"visibility",color:"success"},{default:B(()=>[a(" Show ")]),_:2},1032,["onClick"])])])]))),128)):(s(),l("tr",Ze,tt)),N(e("tr",{ref_key:"moreLoadingRef",ref:j},[e("td",st,[e("div",lt,[m(y,{size:"40px",thickness:"2px"})])])],512),[[Q,M.value&&!$.value]])]),m(g,{"go-open":I.value.showAnswersModal,"onUpdate:goOpen":w[4]||(w[4]=x=>I.value.showAnswersModal=x),"click-outside":!1},{default:B(()=>[e("div",nt,[e("div",ot,[e("div",null,[at,e("span",null,n(h.value.testType+" - "+h.value.name),1)]),m(_,{onClick:w[3]||(w[3]=x=>I.value.showAnswersClose()),variant:"ghost",size:"lg",icon:"close"})]),(s(!0),l(o,null,v(h.value.answers,(x,u)=>(s(),l("div",{key:u,class:"flex flex-col"},[e("span",rt,n(`${u+1}. ${x.question}`),1),e("div",it,[Array.isArray(x.answer)?(s(),l("b",ct,[a(" Answer/s: "),(s(!0),l(o,null,v(x.answer,(b,t)=>(s(),l("span",{key:t},n(b+`${t+1!==x.answer.length?", ":"."}`),1))),128))])):(s(),l("b",dt,[a(" Answer: "),e("span",null,n(x.answer)+".",1)]))]),ut]))),128))])]),_:1},8,["go-open"])])}}},pt={class:"w-full"},ht={class:"sticky top-[68.5px] flex w-full flex-row items-center gap-6 bg-blue-50 px-4 py-2"},bt=e("h3",null,"Case Scenario History",-1),xt={class:"flex flex-row items-center gap-2"},vt=e("span",{class:"text-sm text-neutral-600 lg:text-base"},"Section",-1),gt={class:"flex flex-row items-center gap-2"},mt=e("span",{class:"text-sm text-neutral-600 lg:text-base"},"Category",-1),ft={class:"w-full table-fixed"},wt=e("tr",{class:"sticky top-[138px] bg-blue-200"},[e("th",{class:"w-16"},"#"),e("th",{class:"px-6 py-4 text-start"},"Name"),e("th",{class:"px-6 py-4 text-start"},"Section"),e("th",{class:"px-6 py-4 text-start"},"Category"),e("th",{class:"px-6 py-4 text-start"},"Case ID"),e("th",{class:"px-6 py-4 text-start"},"Times Taken"),e("th",{class:"px-6 py-4 text-start"},"Date Taken"),e("th",{class:"px-6 py-4"},"Answers"),e("th",{class:"px-6 py-4"},"Nursing Care Plan")],-1),yt={key:0},kt={colspan:"9"},$t={class:"flex w-full items-center justify-center py-6"},At={class:"w-16 text-center"},Ct={class:"max-w-[200px] truncate px-6 py-1 text-start"},Tt={class:"px-6 py-1 text-start"},Vt={class:"px-6 py-1 text-start"},St={class:"px-6 py-1 text-start"},jt={class:"px-6 py-1 text-start"},Dt={class:"px-6 py-1 text-start"},Bt={class:"px-6 py-1 text-start"},Lt={class:"flex h-full w-full flex-row items-center justify-center"},Gt={class:"px-6 py-1"},It={class:"flex h-full w-full flex-row items-center justify-center"},Mt={key:2},Rt=e("td",{colspan:"9"},[e("div",{class:"flex w-full items-center justify-center py-6"},"No entries found")],-1),Et=[Rt],Pt={colspan:"9"},zt={class:"flex w-full items-center justify-center py-6"},Ut={class:"flex max-h-[calc(100svh-32px)] flex-col overflow-y-auto overflow-x-hidden px-4 pb-4"},Nt={class:"sticky top-0 z-10 flex flex-row items-center justify-between bg-blue-50 py-4"},Ot=e("div",null,[e("h2",{class:"leading-none"},"Answers")],-1),Ft={key:0,class:"relative flex flex-col"},Ht=e("h2",null,"Assessment",-1),qt={class:"flex flex-col gap-2 px-2"},Yt=e("h3",null,"Subjective",-1),Kt=e("h3",null,"Objectives",-1),Wt={class:"list-disc pl-4"},Jt=e("hr",{class:"my-4"},null,-1),Qt=e("h2",null,"Nursing Diagnosis",-1),Xt={class:"px-2"},Zt=e("hr",{class:"my-4"},null,-1),es=e("h2",null,"Planning",-1),ts={class:"flex flex-col gap-2 px-2"},ss=e("h3",null,"Short Term Goals",-1),ls={class:"list-disc pl-4"},ns=e("h3",null,"Long Term Goals",-1),os={class:"list-disc pl-4"},as=e("hr",{class:"my-4"},null,-1),rs=e("h2",null,"Interventions and Rationale",-1),is={class:"flex flex-col gap-4 px-2 pt-2"},cs={class:"w-full table-fixed"},ds=e("tr",null,[e("th",{class:"border border-black"},"Independents"),e("th",{class:"border border-black"},"Rationale")],-1),us={class:"border border-black p-2"},_s={class:"border border-black p-2"},ps={class:"w-full table-fixed"},hs=e("tr",null,[e("th",{class:"border border-black"},"Dependents"),e("th",{class:"border border-black"},"Rationale")],-1),bs={class:"border border-black p-2"},xs={class:"border border-black p-2"},vs={class:"w-full table-fixed"},gs=e("tr",null,[e("th",{class:"border border-black"},"Collaborative"),e("th",{class:"border border-black"},"Rationale")],-1),ms={class:"border border-black p-2"},fs={class:"border border-black p-2"},ws={key:1,class:"flex flex-col"},ys=e("h2",null,"Assessment",-1),ks={class:"flex flex-col gap-2 px-2"},$s=e("h3",null,"Subjective",-1),As=e("h3",null,"Objectives",-1),Cs={class:"list-disc pl-4"},Ts=e("hr",{class:"my-4"},null,-1),Vs=e("h2",null,"Nursing Diagnosis",-1),Ss={class:"px-2"},js=e("hr",{class:"my-4"},null,-1),Ds=e("h2",null,"Planning",-1),Bs={class:"flex flex-col gap-2 px-2"},Ls=e("h3",null,"Short Term Goals",-1),Gs={class:"list-disc pl-4"},Is=e("h3",null,"Long Term Goals",-1),Ms={class:"list-disc pl-4"},Rs=e("hr",{class:"my-4"},null,-1),Es=e("h2",null,"Interventions and Rationale",-1),Ps={class:"flex flex-col gap-4 px-2 pt-2"},zs={class:"w-full table-fixed"},Us=e("tr",null,[e("th",{class:"border border-black"},"Independents"),e("th",{class:"border border-black"},"Rationale")],-1),Ns={class:"w-full table-fixed"},Os=e("tr",null,[e("th",{class:"border border-black"},"Dependents"),e("th",{class:"border border-black"},"Rationale")],-1),Fs={class:"w-full table-fixed"},Hs=e("tr",null,[e("th",{class:"border border-black"},"Collaborative"),e("th",{class:"border border-black"},"Rationale")],-1),qs={key:0,class:"hidden w-full table-fixed border-collapse border border-black bg-white font-['Times'] text-[15px] text-black",id:"table"},Ys=e("tr",null,[e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Assessment"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Nursing Diagnosis"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Planning"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Intervention"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Rationale"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Evaluation")],-1),Ks={class:"border border-black px-4 py-2 text-start align-top"},Ws=e("br",null,null,-1),Js=e("br",null,null,-1),Qs=e("br",null,null,-1),Xs=e("br",null,null,-1),Zs=e("br",null,null,-1),el=e("br",null,null,-1),tl=e("br",null,null,-1),sl={class:"border border-black px-4 py-2 text-start align-top"},ll={class:"border border-black px-4 py-2 text-start align-top"},nl=e("br",null,null,-1),ol=e("br",null,null,-1),al=e("br",null,null,-1),rl=e("br",null,null,-1),il=e("br",null,null,-1),cl=e("br",null,null,-1),dl=e("br",null,null,-1),ul=e("br",null,null,-1),_l=e("br",null,null,-1),pl=e("br",null,null,-1),hl=e("br",null,null,-1),bl=e("br",null,null,-1),xl=e("br",null,null,-1),vl={class:"border border-black px-4 py-2 text-start align-top"},gl=e("br",null,null,-1),ml=e("br",null,null,-1),fl=e("br",null,null,-1),wl=e("br",null,null,-1),yl=e("br",null,null,-1),kl=e("br",null,null,-1),$l=e("br",null,null,-1),Al=e("br",null,null,-1),Cl=e("br",null,null,-1),Tl=e("br",null,null,-1),Vl=e("br",null,null,-1),Sl=e("br",null,null,-1),jl=e("br",null,null,-1),Dl=e("br",null,null,-1),Bl={class:"border border-black px-4 py-2 text-start align-top"},Ll=e("br",null,null,-1),Gl=e("br",null,null,-1),Il=e("br",null,null,-1),Ml=e("br",null,null,-1),Rl=e("br",null,null,-1),El=e("br",null,null,-1),Pl=e("br",null,null,-1),zl=e("br",null,null,-1),Ul=e("br",null,null,-1),Nl=e("br",null,null,-1),Ol=e("br",null,null,-1),Fl=e("br",null,null,-1),Hl=e("br",null,null,-1),ql=e("br",null,null,-1),Yl={class:"border border-black px-4 py-2 text-start align-top"},Kl=e("br",null,null,-1),Wl=e("br",null,null,-1),Jl=e("br",null,null,-1),Ql=e("br",null,null,-1),Xl=e("br",null,null,-1),Zl=e("br",null,null,-1),en=e("br",null,null,-1),tn=e("br",null,null,-1),sn=e("br",null,null,-1),ln=e("br",null,null,-1),nn=e("br",null,null,-1),on=e("br",null,null,-1),an=e("br",null,null,-1),rn=e("br",null,null,-1),cn=e("br",null,null,-1),dn=e("br",null,null,-1),un=e("br",null,null,-1),_n=e("br",null,null,-1),pn=e("br",null,null,-1),hn=e("br",null,null,-1),bn=e("br",null,null,-1),xn=e("br",null,null,-1),vn=e("br",null,null,-1),gn={__name:"CaseScenarioHistoryTab",setup(G){const V=q(),i=k(null),A=k([]),$=k([]),M=k(!0),j=k(!0),f=k(null),S=k(null),p=k({text:"",section:"All",category:"All"}),h=["All","Activity/Rest","Elimination","Food/Fluid","Pain/Discomfort","Respiration","Safety","Teaching/Learning"],I=ee(async(r,y,D)=>{($.value.length===50||$.value.length===0)&&await z({method:"get",url:"https://nxgen-backend.onrender.com/api/v2/history/case-scenario/search",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"},params:{search:r,section:y,category:D,cursor:S.value}}).then(_=>{$.value=_.data,A.value.push(...$.value),_.data.length>0&&(S.value=_.data[_.data.length-1].id),_.data.length<50&&(j.value=!1)}).catch(_=>{_.response.status==401?V.push({name:"admin login"}):E.add({msg:_.response.data,duration:4e3}),j.value=!1}).finally(()=>M.value=!1)});Y(()=>{J(()=>{$.value=[],A.value=[],M.value=!0,S.value=null,I(p.value.text,p.value.section,p.value.category)});let r=!1;K.value.addEventListener("scroll",()=>{let y=window.innerHeight;f.value.getBoundingClientRect().top+f.value.offsetHeight/2<y&&!r&&(window.requestAnimationFrame(async()=>{I(),r=!1}),r=!0)})});const d=oe({answers:null,parsedAnswers:null,isLoading:!1,async goParse(r,y,D){this.isLoading=!0,await z({method:"get",url:`https://nxgen-backend.onrender.com/api/v2/case-scenarios//${D}`,headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"},params:{category:y}}).then(_=>{let g={},x=_.data.nursing_diagnosis.diagnosis.texts.map(u=>u.text).indexOf(r.diagnosis);g.subjective={answer:r.subjective,isCorrect:r.subjective===_.data.assessment.subjectives.correctValue},g.objectives=[],r.objective.forEach(u=>{_.data.assessment.objectives.forEach(b=>{u===b.text&&g.objectives.push({answer:u,isCorrect:b.isCorrect})})}),g.diagnosis={answer:r.diagnosis,isCorrect:r.diagnosis===_.data.nursing_diagnosis.diagnosis.correctValue},g.relatedTo={answer:r.relatedTo,isCorrect:r.relatedTo===_.data.nursing_diagnosis.relatedTo.correctValue},g.signsAndSymptoms=[],r.signsAndSymptoms.forEach(u=>{_.data.nursing_diagnosis.signsAndSymptoms.forEach(b=>{u===b.text&&g.signsAndSymptoms.push({answer:u,isCorrect:b.isCorrect})})}),g.shortTermGoals=[],r.shortTermGoal.forEach(u=>{_.data.planning.shortTermGoals.forEach(b=>{u===b.text&&g.shortTermGoals.push({answer:u,isCorrect:b.isCorrect})})}),g.longTermGoals=[],r.longTermGoal.forEach(u=>{_.data.planning.longTermGoals.forEach(b=>{u===b.text&&g.longTermGoals.push({answer:u,isCorrect:b.isCorrect})})}),g.independents=[],r.independent.forEach((u,b)=>{_.data.nursing_diagnosis.diagnosis.texts[x].intervention.independents.forEach((t,c)=>{u.split("::")[0]===t.text&&g.independents.push({answer:u,isCorrect:t.isCorrect&&b===c,rationaleCorrect:u.split("::")[1]===t.rationale&&t.isCorrect,order:c+1})})}),g.dependents=[],r.dependent.forEach((u,b)=>{_.data.nursing_diagnosis.diagnosis.texts[x].intervention.dependents.forEach((t,c)=>{u.split("::")[0]===t.text&&g.dependents.push({answer:u,isCorrect:t.isCorrect&&b===c,rationaleCorrect:u.split("::")[1]===t.rationale&&t.isCorrect,order:c+1})})}),g.collaboratives=[],r.collaborative.forEach(u=>{_.data.nursing_diagnosis.diagnosis.texts[x].intervention.collaboratives.forEach((b,t)=>{u.split("::")[0]===b.text&&g.collaboratives.push({answer:u,isCorrect:b.isCorrect,rationaleCorrect:u.split("::")[1]===b.rationale&&b.isCorrect})})}),this.parsedAnswers=g}).catch(_=>{console.log(_),_.response.status==401?V.push({name:"admin login"}):E.add({msg:_.response.data,duration:4e3})}).finally(()=>this.isLoading=!1)},name:""}),w=k({showAnswersModal:!1,showAnswersOpen(r,y,D,_){d.answers=r,d.name=y,d.goParse(r,D,_),this.showAnswersModal=!0},showAnswersClose(){setTimeout(()=>{d.answers=null,d.parsedAnswers=null,d.name=null},150),this.showAnswersModal=!1}});async function L(r,y,D,_,g,x){await z({method:"get",url:`https://nxgen-backend.onrender.com/api/v2/history/case-scenario/${r}`,headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"}}).then(u=>(i.value=u.data,i.value)).then(u=>{let b=[];b.push(u.score.assessment),b.push(u.score.nursingDiagnosis),b.push(u.score.planning),b.push(u.score.intervention),b.push(u.score.evaluation),b.push(u.score.overall),ae(y,D,_,g,new Date(x).toLocaleString().replace(","," -"),b)}).catch(u=>{u.response.status==401?V.push({name:"admin login"}):E.add({msg:u.response.data,duration:4e3})})}return(r,y)=>{const D=T("VFormTextbox"),_=T("VSelect"),g=T("VLoader"),x=T("VButton"),u=T("VIconButton"),b=T("VModal");return s(),l("div",pt,[e("div",ht,[bt,m(D,{modelValue:p.value.text,"onUpdate:modelValue":y[0]||(y[0]=t=>p.value.text=t),placeholder:"Search for Name or Case ID",class:"w-72"},null,8,["modelValue"]),e("div",xt,[vt,m(_,{modelValue:p.value.section,"onUpdate:modelValue":y[1]||(y[1]=t=>p.value.section=t),options:["All","1A","1B","1C","1D"],class:"w-20"},null,8,["modelValue"])]),e("div",gt,[mt,m(_,{modelValue:p.value.category,"onUpdate:modelValue":y[2]||(y[2]=t=>p.value.category=t),options:h,class:"w-40"},null,8,["modelValue"])])]),e("table",ft,[wt,M.value?(s(),l("tr",yt,[e("td",kt,[e("div",$t,[m(g,{size:"40px",thickness:"2px"})])])])):A.value.length>0?(s(!0),l(o,{key:1},v(A.value,(t,c)=>(s(),l("tr",{key:c,class:"text-center odd:bg-blue-100"},[e("td",At,n(c+1),1),e("td",Ct,n(t.name),1),e("td",Tt,n(t.section),1),e("td",Vt,n(t.category),1),e("td",St,n(t.caseId),1),e("td",jt,n(t.timesTaken),1),e("td",Dt,n(new Date(t.dateTaken).toLocaleString().replace(","," -")),1),e("td",Bt,[e("div",Lt,[m(x,{onClick:te=>w.value.showAnswersOpen(t.answers,t.name,t.category,t.caseId),variant:"filled","start-icon":"visibility",color:"success"},{default:B(()=>[a(" Show ")]),_:2},1032,["onClick"])])]),e("td",Gt,[e("div",It,[m(x,{onClick:te=>L(t.id,t.name,t.category,t.caseId,t.timesTaken,t.dateTaken),variant:"filled","start-icon":"print",color:"success"},{default:B(()=>[a(" Print ")]),_:2},1032,["onClick"])])])]))),128)):(s(),l("tr",Mt,Et)),N(e("tr",{ref_key:"moreLoadingRef",ref:f},[e("td",Pt,[e("div",zt,[m(g,{size:"40px",thickness:"2px"})])])],512),[[Q,j.value&&!M.value]])]),m(b,{"go-open":w.value.showAnswersModal,"onUpdate:goOpen":y[4]||(y[4]=t=>w.value.showAnswersModal=t),"click-outside":!1},{default:B(()=>[e("div",Ut,[e("div",Nt,[Ot,m(u,{onClick:y[3]||(y[3]=t=>w.value.showAnswersClose()),variant:"ghost",size:"lg",icon:"close"})]),d.answers&&!d.parsedAnswers?(s(),l("div",Ft,[e("div",null,[Ht,e("div",qt,[e("div",null,[Yt,e("p",null,n(d.answers.subjective),1)]),e("div",null,[Kt,e("ul",Wt,[(s(!0),l(o,null,v(d.answers.objective,t=>(s(),l("li",{key:t},n(t),1))),128))])])])]),Jt,e("div",null,[Qt,e("div",Xt,[e("p",null,[e("span",null,n(d.answers.diagnosis),1),a(" related to "),e("span",null,n(d.answers.relatedTo),1),a(" as evidenced by "),(s(!0),l(o,null,v(d.answers.signsAndSymptoms,(t,c)=>(s(),l("span",{key:t},n(`${t}${c+1<d.answers.signsAndSymptoms.length?", ":"."}`),1))),128))])])]),Zt,e("div",null,[es,e("div",ts,[e("div",null,[ss,e("ul",ls,[(s(!0),l(o,null,v(d.answers.shortTermGoal,t=>(s(),l("li",{key:t},n(t),1))),128))])]),e("div",null,[ns,e("ul",os,[(s(!0),l(o,null,v(d.answers.longTermGoal,t=>(s(),l("li",{key:t},n(t),1))),128))])])])]),as,e("div",null,[rs,e("div",is,[e("table",cs,[ds,(s(!0),l(o,null,v(d.answers.independent,t=>(s(),l("tr",{key:t},[e("td",us,n(t.split("::")[0]),1),e("td",_s,n(t.split("::")[0]),1)]))),128))]),e("table",ps,[hs,(s(!0),l(o,null,v(d.answers.dependent,t=>(s(),l("tr",{key:t},[e("td",bs,n(t.split("::")[0]),1),e("td",xs,n(t.split("::")[0]),1)]))),128))]),e("table",vs,[gs,(s(!0),l(o,null,v(d.answers.collaborative,t=>(s(),l("tr",{key:t},[e("td",ms,n(t.split("::")[0]),1),e("td",fs,n(t.split("::")[0]),1)]))),128))])])]),m(g,{size:"40px",thickness:"2px",class:"fixed right-4 top-[68px]"})])):d.parsedAnswers?(s(),l("div",ws,[e("div",null,[ys,e("div",ks,[e("div",null,[$s,e("p",{class:C(d.parsedAnswers.subjective.isCorrect?"text-emerald-500":"text-red-400")},n(d.parsedAnswers.subjective.answer),3)]),e("div",null,[As,e("ul",Cs,[(s(!0),l(o,null,v(d.parsedAnswers.objectives,t=>(s(),l("li",{class:C(t.isCorrect?"text-emerald-500":"text-red-400"),key:t},n(t.answer),3))),128))])])])]),Ts,e("div",null,[Vs,e("div",Ss,[e("p",null,[e("span",{class:C(d.parsedAnswers.diagnosis.isCorrect?"text-emerald-500":"text-red-400")},n(d.parsedAnswers.diagnosis.answer),3),a(" related to "),e("span",{class:C(d.parsedAnswers.relatedTo.isCorrect?"text-emerald-500":"text-red-400")},n(d.parsedAnswers.relatedTo.answer),3),a(" as evidenced by "),(s(!0),l(o,null,v(d.parsedAnswers.signsAndSymptoms,(t,c)=>(s(),l("span",{key:t,class:C(t.isCorrect?"text-emerald-500":"text-red-400")},n(`${t.answer}${c+1<d.parsedAnswers.signsAndSymptoms.length?", ":"."}`),3))),128))])])]),js,e("div",null,[Ds,e("div",Bs,[e("div",null,[Ls,e("ul",Gs,[(s(!0),l(o,null,v(d.parsedAnswers.shortTermGoals,t=>(s(),l("li",{key:t,class:C(t.isCorrect?"text-emerald-500":"text-red-400")},n(t.answer),3))),128))])]),e("div",null,[Is,e("ul",Ms,[(s(!0),l(o,null,v(d.parsedAnswers.longTermGoals,t=>(s(),l("li",{key:t,class:C(t.isCorrect?"text-emerald-500":"text-red-400")},n(t.answer),3))),128))])])])]),Rs,e("div",null,[Es,e("div",Ps,[e("table",zs,[Us,(s(!0),l(o,null,v(d.parsedAnswers.independents,t=>(s(),l("tr",{key:t},[e("td",{class:C(["border border-black p-2",t.isCorrect?"text-emerald-500":"text-red-400"])},n(t.order)+". "+n(t.answer.split("::")[0]),3),e("td",{class:C(["border border-black p-2",t.rationaleCorrect?"text-emerald-500":"text-red-400"])},n(t.answer.split("::")[1]),3)]))),128))]),e("table",Ns,[Os,(s(!0),l(o,null,v(d.parsedAnswers.dependents,t=>(s(),l("tr",{key:t},[e("td",{class:C(["border border-black p-2",t.isCorrect?"text-emerald-500":"text-red-400"])},n(t.order)+". "+n(t.answer.split("::")[0]),3),e("td",{class:C(["border border-black p-2",t.rationaleCorrect?"text-emerald-500":"text-red-400"])},n(t.answer.split("::")[1]),3)]))),128))]),e("table",Fs,[Hs,(s(!0),l(o,null,v(d.parsedAnswers.collaboratives,t=>(s(),l("tr",{key:t},[e("td",{class:C(["border border-black p-2",t.isCorrect?"text-emerald-500":"text-red-400"])},n(t.answer.split("::")[0]),3),e("td",{class:C(["border border-black p-2",t.rationaleCorrect?"text-emerald-500":"text-red-400"])},n(t.answer.split("::")[1]),3)]))),128))])])])])):H("",!0)])]),_:1},8,["go-open"]),i.value?(s(),l("table",qs,[Ys,e("tr",null,[e("td",Ks,[a(" Subjective:"),Ws,a(" - "+n(i.value.answers.subjective)+" ",1),Js,Qs,a(" Objective:"),Xs,(s(!0),l(o,null,v(i.value.answers.objective,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.objective.length?(s(),l(o,{key:0},[a(" • "+n(t)+" ",1),Zs,el],64)):(s(),l(o,{key:1},[a(" • "+n(t)+" ",1),tl],64))],64))),128))]),e("td",sl,[a(n(`${i.value.answers.diagnosis} related to ${i.value.answers.relatedTo} as evidenced by`)+" ",1),(s(!0),l(o,null,v(i.value.answers.signsAndSymptoms,(t,c)=>(s(),l("span",{key:c},n(`${t}${c+1<i.value.answers.signsAndSymptoms.length?", ":"."}`),1))),128))]),e("td",ll,[a(" Short Term Goal:"),nl,a(" - "+n(i.value.answers.shortTermGoalsDesc),1),ol,al,(s(!0),l(o,null,v(i.value.answers.shortTermGoal,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.shortTermGoal.length?(s(),l(o,{key:0},[a(" • "+n(t)+" ",1),rl,il],64)):(s(),l(o,{key:1},[a(" • "+n(t)+" ",1),cl],64))],64))),128)),dl,a("Long Term Goal:"),ul,a(" - "+n(i.value.answers.longTermGoalsDesc),1),_l,pl,(s(!0),l(o,null,v(i.value.answers.longTermGoal,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.longTermGoal.length?(s(),l(o,{key:0},[a(" • "+n(t)+" ",1),hl,bl],64)):(s(),l(o,{key:1},[a(" • "+n(t)+" ",1),xl],64))],64))),128))]),e("td",vl,[a(" Independent:"),gl,(s(!0),l(o,null,v(i.value.answers.independent,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.independent.length?(s(),l(o,{key:0},[a(" • "+n(t.split("::")[0])+" ",1),ml,fl],64)):(s(),l(o,{key:1},[a(" • "+n(t.split("::")[0])+" ",1),wl],64))],64))),128)),yl,a("Dependent:"),kl,(s(!0),l(o,null,v(i.value.answers.dependent,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.dependent.length?(s(),l(o,{key:0},[a(" • "+n(t.split("::")[0])+" ",1),$l,Al],64)):(s(),l(o,{key:1},[a(" • "+n(t.split("::")[0])+" ",1),Cl],64))],64))),128)),Tl,a("Collaborative:"),Vl,(s(!0),l(o,null,v(i.value.answers.collaborative,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.collaborative.length?(s(),l(o,{key:0},[a(" • "+n(t.split("::")[0])+" ",1),Sl,jl],64)):(s(),l(o,{key:1},[a(" • "+n(t.split("::")[0])+" ",1),Dl],64))],64))),128))]),e("td",Bl,[a(" Independent:"),Ll,(s(!0),l(o,null,v(i.value.answers.independent,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.independent.length?(s(),l(o,{key:0},[a(" • "+n(t.split("::")[1])+" ",1),Gl,Il],64)):(s(),l(o,{key:1},[a(" • "+n(t.split("::")[1])+" ",1),Ml],64))],64))),128)),Rl,a("Dependent:"),El,(s(!0),l(o,null,v(i.value.answers.dependent,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.dependent.length?(s(),l(o,{key:0},[a(" • "+n(t.split("::")[1])+" ",1),Pl,zl],64)):(s(),l(o,{key:1},[a(" • "+n(t.split("::")[1])+" ",1),Ul],64))],64))),128)),Nl,a("Collaborative:"),Ol,(s(!0),l(o,null,v(i.value.answers.collaborative,(t,c)=>(s(),l(o,{key:c},[c+1!==i.value.answers.collaborative.length?(s(),l(o,{key:0},[a(" • "+n(t.split("::")[1])+" ",1),Fl,Hl],64)):(s(),l(o,{key:1},[a(" • "+n(t.split("::")[1])+" ",1),ql],64))],64))),128))]),e("td",Yl,[a(" Short Term Goal:"),Kl,a(" - "+n(i.value.answers.shortTermGoalsDesc),1),Wl,Jl,(s(!0),l(o,null,v(i.value.answers.shortTermGoal,(t,c)=>(s(),l(o,{key:c},[a(" • "+n(t)+" ",1),Ql,c+1!==i.value.answers.shortTermGoal.length?(s(),l(o,{key:0},[a(" ___Met "),Xl,a(" ___Partially Met "),Zl,a(" ___Unmet "),en,tn],64)):(s(),l(o,{key:1},[a(" ___Met "),sn,a(" ___Partially Met "),ln,a(" ___Unmet "),nn],64))],64))),128)),on,a("Long Term Goal:"),an,a(" - "+n(i.value.answers.longTermGoalsDesc),1),rn,cn,(s(!0),l(o,null,v(i.value.answers.longTermGoal,(t,c)=>(s(),l(o,{key:c},[a(" • "+n(t)+" ",1),dn,c+1!==i.value.answers.longTermGoal.length?(s(),l(o,{key:0},[a(" ___Met "),un,a(" ___Partially Met "),_n,a(" ___Unmet "),pn,hn],64)):(s(),l(o,{key:1},[a(" ___Met "),bn,a(" ___Partially Met "),xn,a(" ___Unmet "),vn],64))],64))),128))])])])):H("",!0)])}}},mn={};function fn(G,V){const i=T("router-view");return s(),U(i,null,{default:B(({Component:A,route:$})=>[m(X,{name:"fade-up",mode:"out-in"},{default:B(()=>[(s(),l("div",{class:"relative flex w-full flex-col",key:$.name},[(s(),U(Z(A)))]))]),_:2},1024)]),_:1})}const wn=W(mn,[["render",fn]]),kn={__name:"HomePage",setup(G){const V=[wn,gn,_t];return(i,A)=>(s(),U(Be,null,{default:B(()=>[m(X,{name:"fade-up",mode:"out-in"},{default:B(()=>[(s(),U(re,null,[(s(),U(Z(V[P(R).index])))],1024))]),_:1})]),_:1}))}};export{kn as default};
