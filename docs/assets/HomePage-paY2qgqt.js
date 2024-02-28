import{_ as K,u as F,r as w,h as q,g as E,t as z,o as s,c as l,a as e,i as R,n as A,b as g,j as O,k as te,d as B,l as U,v as H,m as r,f as P,s as Y,p as M,e as C,q as se,x as le,y as W,F as a,z as x,A as o,B as J,C as oe,D as ne,T as Q,E as X,K as ae}from"./index-Nh9DwrWG.js";const N=L=>(se("data-v-9d379220"),L=L(),le(),L),re={key:0,class:"sticky top-0 z-20 grid grid-cols-3 items-center border-b bg-blue-50 px-6 py-2 shadow-lg"},ie={class:"flex flex-row items-center justify-center gap-2"},ce=N(()=>e("span",{class:"material-icons text-3xl"}," space_dashboard ",-1)),de=[ce],ue=N(()=>e("span",{class:"material-icons text-3xl"}," history ",-1)),_e=[ue],pe=N(()=>e("span",{class:"material-icons text-3xl"}," timeline ",-1)),he=[pe],be={class:"flex flex-row items-center justify-end gap-4"},ve={class:"flex grow flex-col items-center"},xe={class:"flex flex-col gap-2 p-4"},me={class:"flex flex-row items-center justify-between"},ge=N(()=>e("h2",null,"Settings",-1)),fe={class:"flex flex-row items-center justify-between px-6"},we=N(()=>e("h3",null,"Enable Post Test",-1)),ye={class:"flex flex-row gap-2"},ke={class:"flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"},$e={class:"flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"},Ae={class:"flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"},Ce={class:"flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"},Te={key:1},Ve=N(()=>e("hr",{class:"m-2 border-stone-400"},null,-1)),Se={key:1},je={__name:"TheNavbar",setup(L){const T=F(),d=w({settingsModal:!1,settingsToggle(){this.settingsModal=!this.settingsModal}});function $(){M.set(0),T.push({name:"admin dashboard"})}const k=w(!1);async function G(){k.value=!0,await E({method:"delete",url:"https://ncp-api-uzr5.onrender.com/api/v2/admin/logout",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"}}).then(()=>{Object.keys(localStorage).forEach(function(v){/^ncpadmin_/.test(v)&&localStorage.removeItem(v)}),T.push({name:"admin login"}),M.set(0),z.add({msg:"Logged out successfully.",duration:4e3})}).catch(v=>{v.response.status==401?T.push({name:"admin login"}):z.add({msg:v.response.data,duration:4e3})}).finally(()=>k.value=!1)}const D=w(!1),f=w({A1:!1,B1:!1,C1:!1,D1:!1});q(async()=>{await E({method:"get",url:"https://ncp-api-uzr5.onrender.com/api/v2/enable-post-test",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"}}).then(v=>{f.value.A1=v.data.A1,f.value.B1=v.data.B1,f.value.C1=v.data.C1,f.value.D1=v.data.D1}).catch(v=>{v.response.status==401?T.push({name:"admin login"}):z.add({msg:v.response.data,duration:4e3})})});async function S(){D.value=!0,await E({method:"post",url:"https://ncp-api-uzr5.onrender.com/api/v2/enable-post-test",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"},data:{A1:f.value.A1,B1:f.value.B1,C1:f.value.C1,D1:f.value.D1}}).then(()=>{z.add({msg:"Post test availablity updated",duration:4e3})}).catch(v=>{v.response.status==401?T.push({name:"admin login"}):z.add({msg:v.response.data,duration:4e3})}).finally(()=>D.value=!1)}return(v,h)=>{const u=C("VIconButton"),V=C("VLoader"),y=C("VButton"),_=C("VModal");return s(),l("div",{class:A([{"overflow-y-scroll":v.$route.name!=="admin login"},"flex h-[100svh] flex-col"]),ref_key:"scrollStore",ref:Y},[v.$route.name!=="admin login"?(s(),l("div",re,[e("div",null,[e("button",{onClick:h[0]||(h[0]=i=>$()),class:"text-2xl"},"NCP admin")]),e("div",ie,[e("button",{onClick:h[1]||(h[1]=i=>R(M).set(0)),class:A([[R(M).index===0?"active":""],"relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"])},de,2),e("button",{onClick:h[2]||(h[2]=i=>R(M).set(1)),class:A([[R(M).index===1?"active":""],"relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"])},_e,2),e("button",{onClick:h[3]||(h[3]=i=>R(M).set(2)),class:A([[R(M).index===2?"active":""],"relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"])},he,2)]),e("div",be,[g(u,{onClick:h[4]||(h[4]=i=>d.value.settingsToggle()),variant:"ghost",size:"lg",icon:"settings"})])])):O("",!0),e("div",ve,[te(v.$slots,"default",{},void 0,!0)]),g(_,{"go-open":d.value.settingsModal,"onUpdate:goOpen":h[12]||(h[12]=i=>d.value.settingsModal=i),"click-outside":!1},{default:B(()=>[e("div",xe,[e("div",me,[ge,g(u,{onClick:h[5]||(h[5]=i=>d.value.settingsToggle()),variant:"ghost",size:"lg",icon:"close"})]),e("div",fe,[e("div",null,[we,e("div",ye,[e("label",ke,[U(e("input",{"onUpdate:modelValue":h[6]||(h[6]=i=>f.value.A1=i),type:"checkbox",class:"cursor-pointer"},null,512),[[H,f.value.A1]]),r(" 1A ")]),e("label",$e,[U(e("input",{"onUpdate:modelValue":h[7]||(h[7]=i=>f.value.B1=i),type:"checkbox",class:"cursor-pointer"},null,512),[[H,f.value.B1]]),r(" 1B ")]),e("label",Ae,[U(e("input",{"onUpdate:modelValue":h[8]||(h[8]=i=>f.value.C1=i),type:"checkbox",class:"cursor-pointer"},null,512),[[H,f.value.C1]]),r(" 1C ")]),e("label",Ce,[U(e("input",{"onUpdate:modelValue":h[9]||(h[9]=i=>f.value.D1=i),type:"checkbox",class:"cursor-pointer"},null,512),[[H,f.value.D1]]),r(" 1D ")])])]),g(y,{onClick:h[10]||(h[10]=i=>S()),disabled:D.value,class:"w-[81px] justify-center"},{default:B(()=>[D.value?(s(),P(V,{key:0,size:"16px",thickness:"2px"})):(s(),l("span",Te,"Update"))]),_:1},8,["disabled"])]),Ve,g(y,{onClick:h[11]||(h[11]=i=>G()),disabled:k.value,color:"warning",class:"justify-center"},{default:B(()=>[k.value?(s(),P(V,{key:0,size:"16px",thickness:"2px"})):(s(),l("span",Se,"Logout"))]),_:1},8,["disabled"])])]),_:1},8,["go-open"])],2)}}},De=K(je,[["__scopeId","data-v-9d379220"]]);function Z(L,T=500){let d;return function(...$){clearTimeout(d),d=setTimeout(()=>{L(...$)},T)}}const Be={class:"w-full"},Le={class:"sticky top-[68.5px] flex w-full flex-row items-center gap-6 bg-blue-50 px-4 py-2"},Ie=e("h3",null,"Test History",-1),Ge={class:"flex flex-row items-center gap-2"},Me=e("span",{class:"text-sm text-neutral-600 lg:text-base"},"Section",-1),ze={class:"flex flex-row items-center gap-2"},Re=e("span",{class:"text-sm text-neutral-600 lg:text-base"},"Type",-1),Ee={class:"w-full table-fixed"},Pe=e("tr",{class:"sticky top-[138px] bg-blue-200"},[e("th",{class:"w-16"},"#"),e("th",{class:"px-6 py-4 text-start"},"Name"),e("th",{class:"px-6 py-4 text-start"},"Section"),e("th",{class:"px-6 py-4 text-start"},"Type"),e("th",{class:"px-6 py-4 text-start"},"Score"),e("th",{class:"px-6 py-4 text-start"},"Date Taken"),e("th",{class:"px-6 py-4"},"Answers")],-1),Ue={key:0},Ne={colspan:"7"},He={class:"flex w-full items-center justify-center py-6"},Oe={class:"w-16 text-center"},Fe={class:"max-w-[200px] truncate px-6 py-1 text-start"},qe={class:"px-6 py-1 text-start"},Ye={class:"px-6 py-1 text-start"},Ke={class:"px-6 py-1 text-start"},We={class:"px-6 py-1 text-start"},Je={class:"px-6 py-1"},Qe={class:"flex h-full w-full flex-row items-center justify-center"},Xe={key:2},Ze=e("td",{colspan:"7"},[e("div",{class:"flex w-full items-center justify-center py-6"},"No entries found")],-1),et=[Ze],tt={colspan:"7"},st={class:"flex w-full items-center justify-center py-6"},lt={class:"flex max-h-[calc(100svh-32px)] flex-col overflow-y-auto overflow-x-hidden px-4 pb-4"},ot={class:"sticky top-0 flex flex-row items-center justify-between bg-blue-50 py-4"},nt=e("h2",{class:"leading-none"},"Answers",-1),at={class:"max-w-[560px]"},rt={clas:"flex flex-col gap-1"},it={key:0},ct={key:1},dt=e("hr",{class:"mx-2 my-4 border-neutral-300"},null,-1),ut={__name:"TestHistoryTab",setup(L){const T=F(),d=w([]),$=w([]),k=w(!0),G=w(!0),D=w(null),f=w(null),S=w({text:"",section:"All",type:"All"}),v=Z(async(V,y,_)=>{($.value.length===50||$.value.length===0)&&await E({method:"get",url:"https://ncp-api-uzr5.onrender.com/api/v2/history/test/search",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"},params:{search:V,section:y,testType:_==="Pre test"?"PRETEST":_==="Post test"?"POSTTEST":"All",cursor:f.value}}).then(i=>{$.value=i.data,d.value.push(...$.value),k.value=!1,i.data.length>0&&(f.value=i.data[i.data.length-1].id),i.data.length<50&&(G.value=!1)}).catch(i=>{i.response.status==401?T.push({name:"admin login"}):z.add({msg:i.response.data,duration:4e3})}).finally(()=>k.value=!1)});q(()=>{W(()=>{$.value=[],d.value=[],k.value=!0,f.value=null,v(S.value.text,S.value.section,S.value.type)});let V=!1;Y.value.addEventListener("scroll",()=>{let y=window.innerHeight;D.value.getBoundingClientRect().top+D.value.offsetHeight/2<y&&!V&&(window.requestAnimationFrame(async()=>{v(),V=!1}),V=!0)})});const h=w({answers:null,name:"",testType:""}),u=w({showAnswersModal:!1,showAnswersOpen(V,y,_){h.value={answers:V,name:y,testType:_},this.showAnswersModal=!0},showAnswersClose(){this.showAnswersModal=!1}});return(V,y)=>{const _=C("VFormTextbox"),i=C("VSelect"),j=C("VLoader"),b=C("VButton"),m=C("VIconButton"),I=C("VModal");return s(),l("div",Be,[e("div",Le,[Ie,g(_,{modelValue:S.value.text,"onUpdate:modelValue":y[0]||(y[0]=n=>S.value.text=n),placeholder:"Search for Name",class:"w-72"},null,8,["modelValue"]),e("div",Ge,[Me,g(i,{modelValue:S.value.section,"onUpdate:modelValue":y[1]||(y[1]=n=>S.value.section=n),options:["All","1A","1B","1C","1D"],class:"w-20"},null,8,["modelValue"])]),e("div",ze,[Re,g(i,{modelValue:S.value.type,"onUpdate:modelValue":y[2]||(y[2]=n=>S.value.type=n),options:["All","Pre test","Post test"],class:"w-32"},null,8,["modelValue"])])]),e("table",Ee,[Pe,k.value?(s(),l("tr",Ue,[e("td",Ne,[e("div",He,[g(j,{size:"40px",thickness:"2px"})])])])):d.value.length>0?(s(!0),l(a,{key:1},x(d.value,(n,p)=>(s(),l("tr",{key:p,class:"text-center odd:bg-blue-100"},[e("td",Oe,o(p+1),1),e("td",Fe,o(n.name),1),e("td",qe,o(n.section),1),e("td",Ye,o(n.testType),1),e("td",Ke,o(n.score),1),e("td",We,o(new Date(n.dateTaken).toLocaleString().replace(","," -")),1),e("td",Je,[e("div",Qe,[g(b,{onClick:t=>u.value.showAnswersOpen(n.answers,n.name,n.testType),variant:"filled","start-icon":"visibility",color:"success"},{default:B(()=>[r(" Show ")]),_:2},1032,["onClick"])])])]))),128)):(s(),l("tr",Xe,et)),U(e("tr",{ref_key:"moreLoadingRef",ref:D},[e("td",tt,[e("div",st,[g(j,{size:"40px",thickness:"2px"})])])],512),[[J,G.value&&!k.value]])]),g(I,{"go-open":u.value.showAnswersModal,"onUpdate:goOpen":y[4]||(y[4]=n=>u.value.showAnswersModal=n),"click-outside":!1},{default:B(()=>[e("div",lt,[e("div",ot,[e("div",null,[nt,e("span",null,o(h.value.testType+" - "+h.value.name),1)]),g(m,{onClick:y[3]||(y[3]=n=>u.value.showAnswersClose()),variant:"ghost",size:"lg",icon:"close"})]),(s(!0),l(a,null,x(h.value.answers,(n,p)=>(s(),l("div",{key:p,class:"flex flex-col"},[e("span",at,o(`${p+1}. ${n.question}`),1),e("div",rt,[Array.isArray(n.answer)?(s(),l("b",it,[r(" Answer/s: "),(s(!0),l(a,null,x(n.answer,(t,c)=>(s(),l("span",{key:c},o(t+`${c+1!==n.answer.length?", ":"."}`),1))),128))])):(s(),l("b",ct,[r(" Answer: "),e("span",null,o(n.answer)+".",1)]))]),dt]))),128))])]),_:1},8,["go-open"])])}}},_t={class:"w-full"},pt={class:"sticky top-[68.5px] flex w-full flex-row items-center gap-6 bg-blue-50 px-4 py-2"},ht=e("h3",null,"Case Scenario History",-1),bt={class:"flex flex-row items-center gap-2"},vt=e("span",{class:"text-sm text-neutral-600 lg:text-base"},"Section",-1),xt={class:"flex flex-row items-center gap-2"},mt=e("span",{class:"text-sm text-neutral-600 lg:text-base"},"Category",-1),gt={class:"w-full table-fixed"},ft=e("tr",{class:"sticky top-[138px] bg-blue-200"},[e("th",{class:"w-16"},"#"),e("th",{class:"px-6 py-4 text-start"},"Name"),e("th",{class:"px-6 py-4 text-start"},"Section"),e("th",{class:"px-6 py-4 text-start"},"Category"),e("th",{class:"px-6 py-4 text-start"},"Case ID"),e("th",{class:"px-6 py-4 text-start"},"Times Taken"),e("th",{class:"px-6 py-4 text-start"},"Date Taken"),e("th",{class:"px-6 py-4"},"Answers"),e("th",{class:"px-6 py-4"},"Nursing Care Plan")],-1),wt={key:0},yt={colspan:"9"},kt={class:"flex w-full items-center justify-center py-6"},$t={class:"w-16 text-center"},At={class:"max-w-[200px] truncate px-6 py-1 text-start"},Ct={class:"px-6 py-1 text-start"},Tt={class:"px-6 py-1 text-start"},Vt={class:"px-6 py-1 text-start"},St={class:"px-6 py-1 text-start"},jt={class:"px-6 py-1 text-start"},Dt={class:"px-6 py-1 text-start"},Bt={class:"flex h-full w-full flex-row items-center justify-center"},Lt={class:"px-6 py-1"},It={class:"flex h-full w-full flex-row items-center justify-center"},Gt={key:2},Mt=e("td",{colspan:"9"},[e("div",{class:"flex w-full items-center justify-center py-6"},"No entries found")],-1),zt=[Mt],Rt={colspan:"9"},Et={class:"flex w-full items-center justify-center py-6"},Pt={class:"flex max-h-[calc(100svh-32px)] flex-col overflow-y-auto overflow-x-hidden px-4 pb-4"},Ut={class:"sticky top-0 z-10 flex flex-row items-center justify-between bg-blue-50 py-4"},Nt=e("div",null,[e("h2",{class:"leading-none"},"Answers")],-1),Ht={key:0,class:"relative flex flex-col"},Ot=e("h2",null,"Assessment",-1),Ft={class:"flex flex-col gap-2 px-2"},qt=e("h3",null,"Subjective",-1),Yt=e("h3",null,"Objectives",-1),Kt={class:"list-disc pl-4"},Wt=e("hr",{class:"my-4"},null,-1),Jt=e("h2",null,"Nursing Diagnosis",-1),Qt={class:"px-2"},Xt=e("hr",{class:"my-4"},null,-1),Zt=e("h2",null,"Planning",-1),es={class:"flex flex-col gap-2 px-2"},ts=e("h3",null,"Short Term Goals",-1),ss={class:"list-disc pl-4"},ls=e("h3",null,"Long Term Goals",-1),os={class:"list-disc pl-4"},ns=e("hr",{class:"my-4"},null,-1),as=e("h2",null,"Interventions and Rationale",-1),rs={class:"flex flex-col gap-4 px-2 pt-2"},is={class:"w-full table-fixed"},cs=e("tr",null,[e("th",{class:"border border-black"},"Independents"),e("th",{class:"border border-black"},"Rationale")],-1),ds={class:"border border-black p-2"},us={class:"border border-black p-2"},_s={class:"w-full table-fixed"},ps=e("tr",null,[e("th",{class:"border border-black"},"Dependents"),e("th",{class:"border border-black"},"Rationale")],-1),hs={class:"border border-black p-2"},bs={class:"border border-black p-2"},vs={class:"w-full table-fixed"},xs=e("tr",null,[e("th",{class:"border border-black"},"Collaborative"),e("th",{class:"border border-black"},"Rationale")],-1),ms={class:"border border-black p-2"},gs={class:"border border-black p-2"},fs={key:1,class:"flex flex-col"},ws=e("h2",null,"Assessment",-1),ys={class:"flex flex-col gap-2 px-2"},ks=e("h3",null,"Subjective",-1),$s=e("h3",null,"Objectives",-1),As={class:"list-disc pl-4"},Cs=e("hr",{class:"my-4"},null,-1),Ts=e("h2",null,"Nursing Diagnosis",-1),Vs={class:"px-2"},Ss=e("hr",{class:"my-4"},null,-1),js=e("h2",null,"Planning",-1),Ds={class:"flex flex-col gap-2 px-2"},Bs=e("h3",null,"Short Term Goals",-1),Ls={class:"list-disc pl-4"},Is=e("h3",null,"Long Term Goals",-1),Gs={class:"list-disc pl-4"},Ms=e("hr",{class:"my-4"},null,-1),zs=e("h2",null,"Interventions and Rationale",-1),Rs={class:"flex flex-col gap-4 px-2 pt-2"},Es={class:"w-full table-fixed"},Ps=e("tr",null,[e("th",{class:"border border-black"},"Independents"),e("th",{class:"border border-black"},"Rationale")],-1),Us={class:"w-full table-fixed"},Ns=e("tr",null,[e("th",{class:"border border-black"},"Dependents"),e("th",{class:"border border-black"},"Rationale")],-1),Hs={class:"w-full table-fixed"},Os=e("tr",null,[e("th",{class:"border border-black"},"Collaborative"),e("th",{class:"border border-black"},"Rationale")],-1),Fs={key:0,class:"hidden w-full table-fixed border-collapse border border-black bg-white font-['Times'] text-[15px] text-black",id:"table"},qs=e("tr",null,[e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Assessment"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Nursing Diagnosis"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Planning"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Intervention"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Rationale"),e("th",{class:"border border-black px-2 pb-6 pt-2 text-center"},"Evaluation")],-1),Ys={class:"border border-black px-4 py-2 text-start align-top"},Ks=e("br",null,null,-1),Ws=e("br",null,null,-1),Js=e("br",null,null,-1),Qs=e("br",null,null,-1),Xs=e("br",null,null,-1),Zs=e("br",null,null,-1),el=e("br",null,null,-1),tl={class:"border border-black px-4 py-2 text-start align-top"},sl={class:"border border-black px-4 py-2 text-start align-top"},ll=e("br",null,null,-1),ol=e("br",null,null,-1),nl=e("br",null,null,-1),al=e("br",null,null,-1),rl=e("br",null,null,-1),il=e("br",null,null,-1),cl=e("br",null,null,-1),dl=e("br",null,null,-1),ul=e("br",null,null,-1),_l=e("br",null,null,-1),pl=e("br",null,null,-1),hl=e("br",null,null,-1),bl=e("br",null,null,-1),vl={class:"border border-black px-4 py-2 text-start align-top"},xl=e("br",null,null,-1),ml=e("br",null,null,-1),gl=e("br",null,null,-1),fl=e("br",null,null,-1),wl=e("br",null,null,-1),yl=e("br",null,null,-1),kl=e("br",null,null,-1),$l=e("br",null,null,-1),Al=e("br",null,null,-1),Cl=e("br",null,null,-1),Tl=e("br",null,null,-1),Vl=e("br",null,null,-1),Sl=e("br",null,null,-1),jl=e("br",null,null,-1),Dl={class:"border border-black px-4 py-2 text-start align-top"},Bl=e("br",null,null,-1),Ll=e("br",null,null,-1),Il=e("br",null,null,-1),Gl=e("br",null,null,-1),Ml=e("br",null,null,-1),zl=e("br",null,null,-1),Rl=e("br",null,null,-1),El=e("br",null,null,-1),Pl=e("br",null,null,-1),Ul=e("br",null,null,-1),Nl=e("br",null,null,-1),Hl=e("br",null,null,-1),Ol=e("br",null,null,-1),Fl=e("br",null,null,-1),ql={class:"border border-black px-4 py-2 text-start align-top"},Yl=e("br",null,null,-1),Kl=e("br",null,null,-1),Wl=e("br",null,null,-1),Jl=e("br",null,null,-1),Ql=e("br",null,null,-1),Xl=e("br",null,null,-1),Zl=e("br",null,null,-1),eo=e("br",null,null,-1),to=e("br",null,null,-1),so=e("br",null,null,-1),lo=e("br",null,null,-1),oo=e("br",null,null,-1),no=e("br",null,null,-1),ao=e("br",null,null,-1),ro=e("br",null,null,-1),io=e("br",null,null,-1),co=e("br",null,null,-1),uo=e("br",null,null,-1),_o=e("br",null,null,-1),po=e("br",null,null,-1),ho=e("br",null,null,-1),bo=e("br",null,null,-1),vo=e("br",null,null,-1),xo={__name:"CaseScenarioHistoryTab",setup(L){const T=F(),d=w(null),$=w([]),k=w([]),G=w(!0),D=w(!0),f=w(null),S=w(null),v=w({text:"",section:"All",category:"All"}),h=Z(async(_,i,j)=>{(k.value.length===50||k.value.length===0)&&await E({method:"get",url:"https://ncp-api-uzr5.onrender.com/api/v2/history/case-scenario/search",headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"},params:{search:_,section:i,category:j,cursor:S.value}}).then(b=>{k.value=b.data,$.value.push(...k.value),b.data.length>0&&(S.value=b.data[b.data.length-1].id),b.data.length<50&&(D.value=!1)}).catch(b=>{b.response.status==401?T.push({name:"admin login"}):z.add({msg:b.response.data,duration:4e3}),D.value=!1}).finally(()=>G.value=!1)});q(()=>{W(()=>{k.value=[],$.value=[],G.value=!0,S.value=null,h(v.value.text,v.value.section,v.value.category)});let _=!1;Y.value.addEventListener("scroll",()=>{let i=window.innerHeight;f.value.getBoundingClientRect().top+f.value.offsetHeight/2<i&&!_&&(window.requestAnimationFrame(async()=>{h(),_=!1}),_=!0)})});const u=oe({answers:null,parsedAnswers:null,isLoading:!1,async goParse(_,i,j){this.isLoading=!0,await E({method:"get",url:`https://ncp-api-uzr5.onrender.com/api/v2/case-scenarios/${i}/${j}`,headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"}}).then(b=>{let m={},I=b.data.nursing_diagnosis.diagnosis.texts.map(n=>n.text).indexOf(_.diagnosis);m.subjective={answer:_.subjective,isCorrect:_.subjective===b.data.assessment.subjectives.correctValue},m.objectives=[],_.objective.forEach(n=>{b.data.assessment.objectives.forEach(p=>{n===p.text&&m.objectives.push({answer:n,isCorrect:p.isCorrect})})}),m.diagnosis={answer:_.diagnosis,isCorrect:_.diagnosis===b.data.nursing_diagnosis.diagnosis.correctValue},m.relatedTo={answer:_.relatedTo,isCorrect:_.relatedTo===b.data.nursing_diagnosis.relatedTo.correctValue},m.signsAndSymptoms=[],_.signsAndSymptoms.forEach(n=>{b.data.nursing_diagnosis.signsAndSymptoms.forEach(p=>{n===p.text&&m.signsAndSymptoms.push({answer:n,isCorrect:p.isCorrect})})}),m.shortTermGoals=[],_.shortTermGoal.forEach(n=>{b.data.planning.shortTermGoals.forEach(p=>{n===p.text&&m.shortTermGoals.push({answer:n,isCorrect:p.isCorrect})})}),m.longTermGoals=[],_.longTermGoal.forEach(n=>{b.data.planning.longTermGoals.forEach(p=>{n===p.text&&m.longTermGoals.push({answer:n,isCorrect:p.isCorrect})})}),m.independents=[],_.independent.forEach((n,p)=>{b.data.nursing_diagnosis.diagnosis.texts[I].intervention.independents.forEach((t,c)=>{n.split("::")[0]===t.text&&m.independents.push({answer:n,isCorrect:t.isCorrect&&p===c,rationaleCorrect:n.split("::")[1]===t.rationale&&t.isCorrect,order:c+1})})}),m.dependents=[],_.dependent.forEach((n,p)=>{b.data.nursing_diagnosis.diagnosis.texts[I].intervention.dependents.forEach((t,c)=>{n.split("::")[0]===t.text&&m.dependents.push({answer:n,isCorrect:t.isCorrect&&p===c,rationaleCorrect:n.split("::")[1]===t.rationale&&t.isCorrect,order:c+1})})}),m.collaboratives=[],_.collaborative.forEach(n=>{b.data.nursing_diagnosis.diagnosis.texts[I].intervention.collaboratives.forEach((p,t)=>{n.split("::")[0]===p.text&&m.collaboratives.push({answer:n,isCorrect:p.isCorrect,rationaleCorrect:n.split("::")[1]===p.rationale&&p.isCorrect})})}),this.parsedAnswers=m}).catch(b=>{console.log(b),b.response.status==401?T.push({name:"admin login"}):z.add({msg:b.response.data,duration:4e3})}).finally(()=>this.isLoading=!1)},name:""}),V=w({showAnswersModal:!1,showAnswersOpen(_,i,j,b){u.answers=_,u.name=i,u.goParse(_,j,b),this.showAnswersModal=!0},showAnswersClose(){setTimeout(()=>{u.answers=null,u.parsedAnswers=null,u.name=null},150),this.showAnswersModal=!1}});async function y(_,i,j,b,m,I){await E({method:"get",url:`https://ncp-api-uzr5.onrender.com/api/v2/history/case-scenario/${_}`,headers:{Authorization:`Bearer ${localStorage.getItem("ncpadmin_token")}`,Role:"admin"}}).then(n=>(d.value=n.data,d.value)).then(n=>{let p=[];p.push(n.score.assessment),p.push(n.score.nursingDiagnosis),p.push(n.score.planning),p.push(n.score.intervention),p.push(n.score.evaluation),p.push(n.score.overall),ne(i,j,b,m,new Date(I).toLocaleString().replace(","," -"),p)}).catch(n=>{n.response.status==401?T.push({name:"admin login"}):z.add({msg:n.response.data,duration:4e3})})}return(_,i)=>{const j=C("VFormTextbox"),b=C("VSelect"),m=C("VLoader"),I=C("VButton"),n=C("VIconButton"),p=C("VModal");return s(),l("div",_t,[e("div",pt,[ht,g(j,{modelValue:v.value.text,"onUpdate:modelValue":i[0]||(i[0]=t=>v.value.text=t),placeholder:"Search for Name or Case ID",class:"w-72"},null,8,["modelValue"]),e("div",bt,[vt,g(b,{modelValue:v.value.section,"onUpdate:modelValue":i[1]||(i[1]=t=>v.value.section=t),options:["All","1A","1B","1C","1D"],class:"w-20"},null,8,["modelValue"])]),e("div",xt,[mt,g(b,{modelValue:v.value.category,"onUpdate:modelValue":i[2]||(i[2]=t=>v.value.category=t),options:["All","Neuro","Etc."],class:"w-40"},null,8,["modelValue","options"])])]),e("table",gt,[ft,G.value?(s(),l("tr",wt,[e("td",yt,[e("div",kt,[g(m,{size:"40px",thickness:"2px"})])])])):$.value.length>0?(s(!0),l(a,{key:1},x($.value,(t,c)=>(s(),l("tr",{key:c,class:"text-center odd:bg-blue-100"},[e("td",$t,o(c+1),1),e("td",At,o(t.name),1),e("td",Ct,o(t.section),1),e("td",Tt,o(t.category),1),e("td",Vt,o(t.caseId),1),e("td",St,o(t.timesTaken),1),e("td",jt,o(new Date(t.dateTaken).toLocaleString().replace(","," -")),1),e("td",Dt,[e("div",Bt,[g(I,{onClick:ee=>V.value.showAnswersOpen(t.answers,t.name,t.category,t.caseId),variant:"filled","start-icon":"visibility",color:"success"},{default:B(()=>[r(" Show ")]),_:2},1032,["onClick"])])]),e("td",Lt,[e("div",It,[g(I,{onClick:ee=>y(t.id,t.name,t.category,t.caseId,t.timesTaken,t.dateTaken),variant:"filled","start-icon":"print",color:"success"},{default:B(()=>[r(" Print ")]),_:2},1032,["onClick"])])])]))),128)):(s(),l("tr",Gt,zt)),U(e("tr",{ref_key:"moreLoadingRef",ref:f},[e("td",Rt,[e("div",Et,[g(m,{size:"40px",thickness:"2px"})])])],512),[[J,D.value&&!G.value]])]),g(p,{"go-open":V.value.showAnswersModal,"onUpdate:goOpen":i[4]||(i[4]=t=>V.value.showAnswersModal=t),"click-outside":!1},{default:B(()=>[e("div",Pt,[e("div",Ut,[Nt,g(n,{onClick:i[3]||(i[3]=t=>V.value.showAnswersClose()),variant:"ghost",size:"lg",icon:"close"})]),u.answers&&!u.parsedAnswers?(s(),l("div",Ht,[e("div",null,[Ot,e("div",Ft,[e("div",null,[qt,e("p",null,o(u.answers.subjective),1)]),e("div",null,[Yt,e("ul",Kt,[(s(!0),l(a,null,x(u.answers.objective,t=>(s(),l("li",{key:t},o(t),1))),128))])])])]),Wt,e("div",null,[Jt,e("div",Qt,[e("p",null,[e("span",null,o(u.answers.diagnosis),1),r(" related to "),e("span",null,o(u.answers.relatedTo),1),r(" as evidenced by "),(s(!0),l(a,null,x(u.answers.signsAndSymptoms,(t,c)=>(s(),l("span",{key:t},o(`${t}${c+1<u.answers.signsAndSymptoms.length?", ":"."}`),1))),128))])])]),Xt,e("div",null,[Zt,e("div",es,[e("div",null,[ts,e("ul",ss,[(s(!0),l(a,null,x(u.answers.shortTermGoal,t=>(s(),l("li",{key:t},o(t),1))),128))])]),e("div",null,[ls,e("ul",os,[(s(!0),l(a,null,x(u.answers.longTermGoal,t=>(s(),l("li",{key:t},o(t),1))),128))])])])]),ns,e("div",null,[as,e("div",rs,[e("table",is,[cs,(s(!0),l(a,null,x(u.answers.independent,t=>(s(),l("tr",{key:t},[e("td",ds,o(t.split("::")[0]),1),e("td",us,o(t.split("::")[0]),1)]))),128))]),e("table",_s,[ps,(s(!0),l(a,null,x(u.answers.dependent,t=>(s(),l("tr",{key:t},[e("td",hs,o(t.split("::")[0]),1),e("td",bs,o(t.split("::")[0]),1)]))),128))]),e("table",vs,[xs,(s(!0),l(a,null,x(u.answers.collaborative,t=>(s(),l("tr",{key:t},[e("td",ms,o(t.split("::")[0]),1),e("td",gs,o(t.split("::")[0]),1)]))),128))])])]),g(m,{size:"40px",thickness:"2px",class:"fixed right-4 top-[68px]"})])):u.parsedAnswers?(s(),l("div",fs,[e("div",null,[ws,e("div",ys,[e("div",null,[ks,e("p",{class:A(u.parsedAnswers.subjective.isCorrect?"text-emerald-500":"text-red-400")},o(u.parsedAnswers.subjective.answer),3)]),e("div",null,[$s,e("ul",As,[(s(!0),l(a,null,x(u.parsedAnswers.objectives,t=>(s(),l("li",{class:A(t.isCorrect?"text-emerald-500":"text-red-400"),key:t},o(t.answer),3))),128))])])])]),Cs,e("div",null,[Ts,e("div",Vs,[e("p",null,[e("span",{class:A(u.parsedAnswers.diagnosis.isCorrect?"text-emerald-500":"text-red-400")},o(u.parsedAnswers.diagnosis.answer),3),r(" related to "),e("span",{class:A(u.parsedAnswers.relatedTo.isCorrect?"text-emerald-500":"text-red-400")},o(u.parsedAnswers.relatedTo.answer),3),r(" as evidenced by "),(s(!0),l(a,null,x(u.parsedAnswers.signsAndSymptoms,(t,c)=>(s(),l("span",{key:t,class:A(t.isCorrect?"text-emerald-500":"text-red-400")},o(`${t.answer}${c+1<u.parsedAnswers.signsAndSymptoms.length?", ":"."}`),3))),128))])])]),Ss,e("div",null,[js,e("div",Ds,[e("div",null,[Bs,e("ul",Ls,[(s(!0),l(a,null,x(u.parsedAnswers.shortTermGoals,t=>(s(),l("li",{key:t,class:A(t.isCorrect?"text-emerald-500":"text-red-400")},o(t.answer),3))),128))])]),e("div",null,[Is,e("ul",Gs,[(s(!0),l(a,null,x(u.parsedAnswers.longTermGoals,t=>(s(),l("li",{key:t,class:A(t.isCorrect?"text-emerald-500":"text-red-400")},o(t.answer),3))),128))])])])]),Ms,e("div",null,[zs,e("div",Rs,[e("table",Es,[Ps,(s(!0),l(a,null,x(u.parsedAnswers.independents,t=>(s(),l("tr",{key:t},[e("td",{class:A(["border border-black p-2",t.isCorrect?"text-emerald-500":"text-red-400"])},o(t.order)+". "+o(t.answer.split("::")[0]),3),e("td",{class:A(["border border-black p-2",t.rationaleCorrect?"text-emerald-500":"text-red-400"])},o(t.answer.split("::")[1]),3)]))),128))]),e("table",Us,[Ns,(s(!0),l(a,null,x(u.parsedAnswers.dependents,t=>(s(),l("tr",{key:t},[e("td",{class:A(["border border-black p-2",t.isCorrect?"text-emerald-500":"text-red-400"])},o(t.order)+". "+o(t.answer.split("::")[0]),3),e("td",{class:A(["border border-black p-2",t.rationaleCorrect?"text-emerald-500":"text-red-400"])},o(t.answer.split("::")[1]),3)]))),128))]),e("table",Hs,[Os,(s(!0),l(a,null,x(u.parsedAnswers.collaboratives,t=>(s(),l("tr",{key:t},[e("td",{class:A(["border border-black p-2",t.isCorrect?"text-emerald-500":"text-red-400"])},o(t.answer.split("::")[0]),3),e("td",{class:A(["border border-black p-2",t.rationaleCorrect?"text-emerald-500":"text-red-400"])},o(t.answer.split("::")[1]),3)]))),128))])])])])):O("",!0)])]),_:1},8,["go-open"]),d.value?(s(),l("table",Fs,[qs,e("tr",null,[e("td",Ys,[r(" Subjective:"),Ks,r(" - "+o(d.value.answers.subjective)+" ",1),Ws,Js,r(" Objective:"),Qs,(s(!0),l(a,null,x(d.value.answers.objective,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.objective.length?(s(),l(a,{key:0},[r(" • "+o(t)+" ",1),Xs,Zs],64)):(s(),l(a,{key:1},[r(" • "+o(t)+" ",1),el],64))],64))),128))]),e("td",tl,[r(o(`${d.value.answers.diagnosis} related to ${d.value.answers.relatedTo} as evidenced by`)+" ",1),(s(!0),l(a,null,x(d.value.answers.signsAndSymptoms,(t,c)=>(s(),l("span",{key:c},o(`${t}${c+1<d.value.answers.signsAndSymptoms.length?", ":"."}`),1))),128))]),e("td",sl,[r(" Short Term Goal:"),ll,r(" - "+o(d.value.answers.shortTermGoalsDesc),1),ol,nl,(s(!0),l(a,null,x(d.value.answers.shortTermGoal,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.shortTermGoal.length?(s(),l(a,{key:0},[r(" • "+o(t)+" ",1),al,rl],64)):(s(),l(a,{key:1},[r(" • "+o(t)+" ",1),il],64))],64))),128)),cl,r("Long Term Goal:"),dl,r(" - "+o(d.value.answers.longTermGoalsDesc),1),ul,_l,(s(!0),l(a,null,x(d.value.answers.longTermGoal,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.longTermGoal.length?(s(),l(a,{key:0},[r(" • "+o(t)+" ",1),pl,hl],64)):(s(),l(a,{key:1},[r(" • "+o(t)+" ",1),bl],64))],64))),128))]),e("td",vl,[r(" Independent:"),xl,(s(!0),l(a,null,x(d.value.answers.independent,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.independent.length?(s(),l(a,{key:0},[r(" • "+o(t.split("::")[0])+" ",1),ml,gl],64)):(s(),l(a,{key:1},[r(" • "+o(t.split("::")[0])+" ",1),fl],64))],64))),128)),wl,r("Dependent:"),yl,(s(!0),l(a,null,x(d.value.answers.dependent,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.dependent.length?(s(),l(a,{key:0},[r(" • "+o(t.split("::")[0])+" ",1),kl,$l],64)):(s(),l(a,{key:1},[r(" • "+o(t.split("::")[0])+" ",1),Al],64))],64))),128)),Cl,r("Collaborative:"),Tl,(s(!0),l(a,null,x(d.value.answers.collaborative,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.collaborative.length?(s(),l(a,{key:0},[r(" • "+o(t.split("::")[0])+" ",1),Vl,Sl],64)):(s(),l(a,{key:1},[r(" • "+o(t.split("::")[0])+" ",1),jl],64))],64))),128))]),e("td",Dl,[r(" Independent:"),Bl,(s(!0),l(a,null,x(d.value.answers.independent,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.independent.length?(s(),l(a,{key:0},[r(" • "+o(t.split("::")[1])+" ",1),Ll,Il],64)):(s(),l(a,{key:1},[r(" • "+o(t.split("::")[1])+" ",1),Gl],64))],64))),128)),Ml,r("Dependent:"),zl,(s(!0),l(a,null,x(d.value.answers.dependent,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.dependent.length?(s(),l(a,{key:0},[r(" • "+o(t.split("::")[1])+" ",1),Rl,El],64)):(s(),l(a,{key:1},[r(" • "+o(t.split("::")[1])+" ",1),Pl],64))],64))),128)),Ul,r("Collaborative:"),Nl,(s(!0),l(a,null,x(d.value.answers.collaborative,(t,c)=>(s(),l(a,{key:c},[c+1!==d.value.answers.collaborative.length?(s(),l(a,{key:0},[r(" • "+o(t.split("::")[1])+" ",1),Hl,Ol],64)):(s(),l(a,{key:1},[r(" • "+o(t.split("::")[1])+" ",1),Fl],64))],64))),128))]),e("td",ql,[r(" Short Term Goal:"),Yl,r(" - "+o(d.value.answers.shortTermGoalsDesc),1),Kl,Wl,(s(!0),l(a,null,x(d.value.answers.shortTermGoal,(t,c)=>(s(),l(a,{key:c},[r(" • "+o(t)+" ",1),Jl,c+1!==d.value.answers.shortTermGoal.length?(s(),l(a,{key:0},[r(" ___Met "),Ql,r(" ___Partially Met "),Xl,r(" ___Unmet "),Zl,eo],64)):(s(),l(a,{key:1},[r(" ___Met "),to,r(" ___Partially Met "),so,r(" ___Unmet "),lo],64))],64))),128)),oo,r("Long Term Goal:"),no,r(" - "+o(d.value.answers.longTermGoalsDesc),1),ao,ro,(s(!0),l(a,null,x(d.value.answers.longTermGoal,(t,c)=>(s(),l(a,{key:c},[r(" • "+o(t)+" ",1),io,c+1!==d.value.answers.longTermGoal.length?(s(),l(a,{key:0},[r(" ___Met "),co,r(" ___Partially Met "),uo,r(" ___Unmet "),_o,po],64)):(s(),l(a,{key:1},[r(" ___Met "),ho,r(" ___Partially Met "),bo,r(" ___Unmet "),vo],64))],64))),128))])])])):O("",!0)])}}},mo={};function go(L,T){const d=C("router-view");return s(),P(d,null,{default:B(({Component:$,route:k})=>[g(Q,{name:"fade-up",mode:"out-in"},{default:B(()=>[(s(),l("div",{class:"relative flex w-full flex-col",key:k.name},[(s(),P(X($)))]))]),_:2},1024)]),_:1})}const fo=K(mo,[["render",go]]),yo={__name:"HomePage",setup(L){const T=[fo,xo,ut];return(d,$)=>(s(),P(De,null,{default:B(()=>[g(Q,{name:"fade-up",mode:"out-in"},{default:B(()=>[(s(),P(ae,null,[(s(),P(X(T[R(M).index])))],1024))]),_:1})]),_:1}))}};export{yo as default};