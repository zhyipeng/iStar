var te=Object.defineProperty;var se=(s,e,t)=>e in s?te(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var v=(s,e,t)=>(se(s,typeof e!="symbol"?e+"":e,t),t);import{r as T,a as W,E as I,d as A,c as $,b as w,o as y,e as k,f as n,u as f,t as S,g as c,w as d,h as oe,i as ne,s as ae,F as U,j as D,k as P,p as le,l as re,m as ce,n as ie,q as B,v as H,x as ue,y as de,z as pe,A as V,B as _e,C as ge,D as fe,G as he,V as J,H as ve,I as me,J as ye,K as Te}from"./vendor.3d2d53d8.js";const we=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const h of i.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}};we();function G(){return{avatar:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",followers:0,following:0}}const K="iStarUserInfo";class be{constructor(){v(this,"token","");v(this,"userinfo",T(G()));const e=localStorage.getItem(K);e&&(this.token=e)}setToken(e){localStorage.setItem(K,e),this.token=e}setUserInfo(e){this.userinfo.value=e}isLogin(){return this.token!==""}clearUserInfo(e=!0){this.userinfo.value=G(),this.token="",e&&window.location.reload()}}const xe=0,Se=1,ke=2;class Ee{constructor(){v(this,"repos",T([]));v(this,"filterTag",T(null));v(this,"filterLang",T(null));v(this,"filterUnTagged",T(!1));v(this,"sortBy",T(0));v(this,"selected",T(null));v(this,"tags",T([]));v(this,"repoTags",T({}))}filterBy(e="",t="",a=!1){this.filterTag.value=e===""?null:e,this.filterLang.value=t===""?null:t,this.filterUnTagged.value=a}sort(e){this.sortBy.value=e}setRepos(e){this.repos.value=e}getRepos(){return this.repos.value.filter(e=>{if(this.filterLang.value&&e.language!==this.filterLang.value)return!1;const t=this.getRepoTag(e.id);return!(this.filterTag.value&&t.indexOf(this.filterTag.value)===-1||this.filterUnTagged.value&&t.length!==0)}).sort((e,t)=>{switch(this.sortBy.value){case xe:return e.updated_at<t.updated_at?1:-1;case Se:return e.stargazers_count<t.stargazers_count?1:-1;case ke:return e.name>t.name?1:-1;default:return e.updated_at<t.updated_at?1:-1}})}setTags(e){this.tags.value=e}addTag(e){this.tags.value.push({tag:e,repo_count:0})}setRepoTags(e){this.repoTags.value=e}setRepoTag(e,t){const a=this.repoTags.value[String(e)]||[];this.repoTags.value[String(e)]=t;const o=new Set(a),i=new Set(t);for(const u of this.tags.value)o.has(u.tag)&&(u.repo_count-=1),i.has(u.tag)&&(u.repo_count+=1);const h=new Set(this.tags.value.map(u=>u.tag));t.forEach(u=>{h.has(u)||this.tags.value.push({tag:u,repo_count:1})})}getRepoTag(e){const t=this.repoTags.value[String(e)];return t||[]}deleteTag(e){this.tags.value=this.tags.value.filter(a=>a.tag!==e);const t=this.repoTags.value;for(const a in t)t[a]=t[a].filter(o=>o!==e);this.repoTags.value=t}}class Re{constructor(){v(this,"user",new be);v(this,"repo",new Ee)}}const r=new Re;class $e{get isProdEnv(){return!0}get baseURL(){return this.isProdEnv?"":"http://localhost:8000"}getUrl(e){return`${this.baseURL}${e}`}}const Q=new $e,E=W.create({baseURL:Q.baseURL});E.interceptors.request.use(s=>{const{token:e}=r.user;return e&&(s.headers["x-token"]=e),s});E.interceptors.response.use(s=>(s.status===401&&r.user.clearUserInfo(),s.data),s=>(I.error(`\u8BF7\u6C42\u5F02\u5E38, \u8BF7\u7A0D\u540E\u91CD\u8BD5: ${s}`),Promise.reject(s)));const Ce=async()=>E({url:"/tag/"}),Be=async s=>E({url:"/tag/",data:{tag:s},method:"POST"}),Le=async(s,e)=>E({url:"/tag/set_tag",method:"POST",data:{tags:s,repos:e}}),Ie=async()=>E({url:"/tag/get_repo_tags"}),Ue=async s=>E({url:"/tag/",data:{tag:s},method:"DELETE"});var F=(s=>(s.AddTag="add-tag",s.Sync="sync",s))(F||{});class De{constructor(){v(this,"handlers");this.handlers={}}register(e,t){this.handlers[e]||(this.handlers[e]=[]),this.handlers[e].push(t)}send(e,...t){const a=this.handlers[e];a&&a.forEach(o=>{o(...t)})}}const z=new De;var O=(s,e)=>{const t=s.__vccOpts||s;for(const[a,o]of e)t[a]=o;return t};const L=s=>(ce("data-v-623ded3f"),s=s(),ie(),s),Ae={class:"container"},Fe=["src"],Me={class:"static-box"},Ve={class:"static-item"},Pe={class:"static-num"},ze=L(()=>n("span",{class:"static-name"},"Starred",-1)),Oe={class:"static-item"},je={class:"static-num"},qe=L(()=>n("span",{class:"static-name"},"Followers",-1)),Ne={class:"static-item"},He={class:"static-num"},Ge=L(()=>n("span",{class:"static-name"},"Following",-1)),Ke={class:"static-item"},We={class:"static-num"},Je=L(()=>n("span",{class:"static-name"},"Manage",-1)),Qe={class:"static-item"},Xe={class:"static-num"},Ye=L(()=>n("span",{class:"static-name"},"Trending",-1)),Ze={class:"static-item"},et={class:"static-num"},tt=L(()=>n("span",{class:"static-name"},"Search",-1)),st=B("All Repo"),ot=B("Untagged Repo"),nt=B("Tag"),at={class:"menu-item-box"},lt={class:"count-item"},rt=B("Language"),ct={class:"menu-item-box"},it={class:"count-item"},ut={class:"footer"},dt=A({setup(s){const e=$(()=>r.user.userinfo.value),t=$(()=>r.repo.repos.value.length),a=$(()=>{const p={};r.repo.repos.value.forEach(l=>{l.language&&(p[l.language]||(p[l.language]=0),p[l.language]+=1)});const b=[];return Object.keys(p).forEach(l=>{b.push({lang:l,count:p[l]})}),b.sort((l,g)=>l.count<g.count?1:-1)}),o=$(()=>r.repo.tags.value),i=()=>{r.user.isLogin()||(r.user.clearUserInfo(!1),window.location.href=Q.getUrl("/oauth/authorize"))},h=async p=>{switch(p){case"all_repo":r.repo.filterBy();break;case"untagged_repo":r.repo.filterBy("","",!0);break;default:p.startsWith("lang-")?r.repo.filterBy("",p.slice(5)):p.startsWith("tag-")?r.repo.filterBy(p.slice(4)):r.repo.filterBy()}},u=async()=>{try{const{value:p}=await H.prompt("\u65B0\u589E\u6807\u7B7E",{cancelButtonText:"\u53D6\u6D88",confirmButtonText:"\u63D0\u4EA4"});if(r.repo.tags.value.findIndex(b=>b.tag===p)!==-1){I.warning("\u5DF2\u5B58\u5728\u7684\u6807\u7B7E\u540D");return}await Be(p),r.repo.addTag(p)}catch(p){String(p)!=="cancel"&&I.error(String(p))}},_=async(p,b)=>{p.preventDefault();try{b.repo_count>0&&await H.confirm(`\u6807\u7B7E${b.tag}\u4ECD\u5728\u4F7F\u7528\u4E2D, \u662F\u5426\u7EE7\u7EED\u5220\u9664? `,{confirmButtonText:"\u662F",cancelButtonText:"\u5426"}),await Ue(b.tag),r.repo.deleteTag(b.tag)}catch(l){String(l)!=="cancel"&&I.error(String(l))}},R=()=>z.send(F.Sync);return(p,b)=>{const l=w("el-icon"),g=w("el-menu-item"),C=w("el-sub-menu"),j=w("el-menu");return y(),k("div",Ae,[n("img",{class:"avatar",src:f(e).avatar,alt:"avatar",onClick:i},null,8,Fe),n("div",Me,[n("div",Ve,[n("span",Pe,S(f(t)),1),ze]),n("div",Oe,[n("span",je,S(f(e).followers),1),qe]),n("div",Ne,[n("span",He,S(f(e).following),1),Ge]),n("div",Ke,[n("span",We,[c(l,null,{default:d(()=>[c(f(oe))]),_:1})]),Je]),n("div",Qe,[n("span",Xe,[c(l,null,{default:d(()=>[c(f(ne))]),_:1})]),Ye]),n("div",Ze,[n("span",et,[c(l,null,{default:d(()=>[c(f(ae))]),_:1})]),tt])]),c(j,{class:"menu-box","background-color":"#eee","default-active":"all_repo","text-color":"#555",onSelect:h},{default:d(()=>[c(g,{index:"all_repo"},{default:d(()=>[st]),_:1}),c(g,{index:"untagged_repo"},{default:d(()=>[ot]),_:1}),c(C,{index:"tag"},{title:d(()=>[nt]),default:d(()=>[(y(!0),k(U,null,D(f(o),x=>(y(),P(g,{index:`tag-${x.tag}`,key:x.tag,onContextmenu:M=>_(M,x)},{title:d(()=>[n("span",at,[n("span",null,S(x.tag),1),n("span",lt,S(x.repo_count),1)])]),_:2},1032,["index","onContextmenu"]))),128))]),_:1}),c(C,{index:"language"},{title:d(()=>[rt]),default:d(()=>[(y(!0),k(U,null,D(f(a),x=>(y(),P(g,{index:`lang-${x.lang}`,key:x.lang},{title:d(()=>[n("span",ct,[n("span",null,S(x.lang),1),n("span",it,S(x.count),1)])]),_:2},1032,["index"]))),128))]),_:1})]),_:1}),n("div",ut,[c(l,{class:"btn",onClick:u},{default:d(()=>[c(f(le))]),_:1}),c(l,{class:"btn",onClick:R},{default:d(()=>[c(f(re))]),_:1})])])}}});var pt=O(dt,[["__scopeId","data-v-623ded3f"]]);const _t={style:{overflow:"auto"}},gt=A({props:{repo:null},setup(s){const e=s,t=T("");return ue(async()=>{if(!e.repo)return;const o=`${e.repo.url}/readme`,{data:i}=await W.get(o,{headers:{Accept:"application/vnd.github.v3+json"}});t.value=de.decode(i.content)}),(o,i)=>{const h=w("v-md-preview");return y(),k("div",_t,[c(h,{text:t.value},null,8,["text"])])}}});const ft={class:"repo-item"},ht={class:"info"},vt=["src"],mt={class:"repo-name"},yt={class:"description"},Tt={class:"footer"},wt={class:"language"},bt={class:"star"},xt=A({props:{repo:null},setup(s){const e=s,t=$(()=>e.repo.owner?e.repo.owner.avatar_url:""),a=$(()=>{const o=r.repo.repoTags.value[String(e.repo.id)];return o||[]});return(o,i)=>{const h=w("el-tag");return y(),k("div",ft,[n("div",ht,[n("img",{class:"avatar",src:f(t),alt:"avatar"},null,8,vt),n("span",mt,S(s.repo.name),1)]),n("p",yt,S(s.repo.description),1),n("div",Tt,[n("span",wt,[n("span",null,S(s.repo.language),1),(y(!0),k(U,null,D(f(a),u=>(y(),P(h,{class:"tag",key:u},{default:d(()=>[B(S(u),1)]),_:2},1024))),128))]),n("span",bt," \u2B50\uFE0F "+S(s.repo.stargazers_count),1)])])}}});var St=O(xt,[["__scopeId","data-v-09615e22"]]);class kt{constructor(){v(this,"options",{menus:[{name:"\u6253\u6807\u7B7E",onclick:e=>{z.send(F.AddTag,e)}},{name:"GitHub",onclick:e=>{window.open(`${e.html_url}`,"_blank")}}]});v(this,"element");v(this,"selectedRepo",null);const e=document.createElement("ul");e.classList.add("context-menu");const{menus:t}=this.options;t.forEach(o=>{const i=document.createElement("li");i.textContent=o.name,i.onclick=()=>{this.selectedRepo&&o.onclick(this.selectedRepo),this.hide()},e.appendChild(i)}),document.querySelector("body").appendChild(e),this.element=e,this.hide()}show(e,t){this.selectedRepo=e;const a=this.element;a.style.position="absolute",a.style.top=`${t.clientY}px`,a.style.left=`${t.clientX}px`,a.style.display="block"}hide(){const e=this.element;e.style.display="none"}}const X=new kt;const Et={class:"container"},Rt={class:"sort-btn-group"},$t={class:"repo-list"},Ct=["onClick","onContextmenu"],Bt={style:{display:"flex","justify-content":"flex-end",width:"100%"}},Lt=B("\u786E\u5B9A"),It=A({setup(s){const e=$(()=>r.repo.getRepos()),t=l=>{r.repo.sort(l)},a=l=>r.repo.sortBy.value===l,o=l=>r.repo.selected.value&&r.repo.selected.value.id===l.id,i=l=>{console.log(l),r.repo.selected.value=l},h=(l,g)=>{g.preventDefault(),X.show(l,g)},u=T(!1),_=T(null),R=T([]),p=async l=>{_.value=l,R.value=r.repo.getRepoTag(l.id),u.value=!0},b=async()=>{if(!!_.value)try{await Le(R.value,[_.value.id]),u.value=!1,r.repo.setRepoTag(_.value.id,R.value)}catch(l){I.error(String(l))}};return z.register(F.AddTag,p),(l,g)=>{const C=w("el-icon"),j=w("el-option"),x=w("el-select"),M=w("el-form-item"),Y=w("el-button"),Z=w("el-form"),ee=w("el-dialog");return y(),k("div",Et,[n("div",Rt,[c(C,{class:V(["sort-btn",{"active-btn":a(0)}]),size:25,onClick:g[0]||(g[0]=m=>t(0))},{default:d(()=>[c(f(pe))]),_:1},8,["class"]),c(C,{class:V(["sort-btn",{"active-btn":a(1)}]),size:25,onClick:g[1]||(g[1]=m=>t(1))},{default:d(()=>[c(f(_e))]),_:1},8,["class"]),c(C,{class:V(["sort-btn",{"active-btn":a(2)}]),size:25,onClick:g[2]||(g[2]=m=>t(2))},{default:d(()=>[c(f(ge))]),_:1},8,["class"])]),n("ul",$t,[(y(!0),k(U,null,D(f(e),m=>(y(),k("li",{class:V(["repo-list-item",{"active-item":o(m)}]),key:m.id,onClick:N=>i(m),onContextmenu:N=>h(m,N)},[c(St,{repo:m},null,8,["repo"])],42,Ct))),128))]),c(ee,{modelValue:u.value,"onUpdate:modelValue":g[4]||(g[4]=m=>u.value=m),title:_.value?_.value.name:""},{default:d(()=>[c(Z,null,{default:d(()=>[c(M,null,{default:d(()=>[c(x,{modelValue:R.value,"onUpdate:modelValue":g[3]||(g[3]=m=>R.value=m),multiple:"","allow-create":"",filterable:"",style:{width:"100%"}},{default:d(()=>[(y(!0),k(U,null,D(f(r).repo.tags.value,m=>(y(),P(j,{key:m.tag,label:m.tag,value:m.tag},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),c(M,null,{default:d(()=>[n("div",Bt,[c(Y,{type:"primary",onClick:b},{default:d(()=>[Lt]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])])}}});var Ut=O(It,[["__scopeId","data-v-588d0d36"]]);function Dt(s){const t=window.location.search.substring(1).split("&");let a="";return t.forEach(o=>{const i=o.split("="),[h,u]=i;h===s&&(a=u)}),a}const At=async()=>E({url:"/user/userinfo"}),Ft=async()=>E({url:"/repo/starred"});const Mt=A({setup(s){const e=$(()=>r.repo.selected.value),t=()=>{X.hide()},a=async()=>{const _=await At();r.user.setUserInfo(_)},o=async()=>{const _=await Ft();r.repo.setRepos(_)},i=async()=>{const _=await Ce();r.repo.setTags(_)},h=async()=>{const _=await Ie();r.repo.setRepoTags(_)},u=async()=>{const _=he.service();try{await Promise.all([a(),o(),i(),h()])}finally{_.close()}};return z.register(F.Sync,u),fe(async()=>{const _=Dt("sign");_?(r.user.setToken(_),window.location.href="/"):r.user.isLogin()&&await u()}),(_,R)=>(y(),k("div",{class:"main-container",onClick:t},[c(pt,{class:"left-side"}),c(Ut,{class:"repo-list"}),c(gt,{repo:f(e),class:"detail"},null,8,["repo"])]))}});var Vt=O(Mt,[["__scopeId","data-v-57d6fa80"]]);J.use(ve,{Hljs:me});const q=ye(Vt);q.use(Te);q.use(J);q.mount("#app");