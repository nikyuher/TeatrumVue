import{d as C,r as v,s as R,g as k,o as b,c as S,b as e,w as m,v as g,h as D,i as _,j as T,k as V,t as N,l as L,m as j,p as U,f as $,_ as I,n as M,q as O,x as P,e as E}from"./index-t-VuXV_o.js";const h=a=>(U("data-v-3624dd70"),a=a(),$(),a),B={class:"input-box"},F=h(()=>e("label",null,"Nombre",-1)),z={class:"input-box"},A=h(()=>e("label",null,"Correo",-1)),J={class:"input-box"},Y=h(()=>e("label",null,"Contraseña",-1)),Z={class:"remember-forgot"},G=h(()=>e("button",{class:"btn",type:"submit"},"Resgistrar",-1)),H=C({__name:"RegistrarUsuario",setup(a){const n=v(""),u=v(""),r=v(""),l=v(!1),o=v(""),f=R.baseUrl,y=t=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t),c=t=>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(t),i=t=>t.length>=4,d=async()=>{if(!i(n.value)){o.value="El nombre debe tener al menos 4 caracteres",setTimeout(()=>{o.value=""},2e3);return}if(!y(u.value)){o.value="Por favor ingrese un correo electrónico válido",setTimeout(()=>{o.value=""},2e3);return}if(!c(r.value)){o.value="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",setTimeout(()=>{o.value=""},3e3);return}if(!l.value){o.value="Por favor acepte los Términos & Condiciones",setTimeout(()=>{o.value=""},2e3);return}const t={nombre:n.value,correoElectronico:u.value,contraseña:r.value};try{const s=await fetch(`${f}/Usuario/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok){const x=await s.json();throw new Error(x.message||"Fallo al registrar al usuario.")}n.value="",u.value="",r.value="",l.value=!1,o.value="Registrado Correctamente.",setTimeout(()=>{o.value=""},2e3)}catch(s){if(s instanceof Error)console.error(s),o.value=s.message||"Error al Registrarte.",setTimeout(()=>{o.value=""},2e3);else throw new Error(String(s))}};return(t,s)=>{const x=k("v-alert");return b(),S("form",{onSubmit:j(d,["prevent"])},[e("div",B,[m(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=p=>n.value=p),required:""},null,512),[[g,n.value]]),F]),e("div",z,[m(e("input",{type:"email","onUpdate:modelValue":s[1]||(s[1]=p=>u.value=p),required:""},null,512),[[g,u.value]]),A]),e("div",J,[m(e("input",{type:"password","onUpdate:modelValue":s[2]||(s[2]=p=>r.value=p),required:""},null,512),[[g,r.value]]),Y]),e("div",Z,[e("label",null,[m(e("input",{type:"checkbox","onUpdate:modelValue":s[3]||(s[3]=p=>l.value=p)},null,512),[[D,l.value]]),_("Acepto los términos y condiciones")])]),G,o.value?(b(),T(x,{key:0,value:!0,type:o.value.includes("Registrado")?"success":"error"},{default:V(()=>[_(N(o.value),1)]),_:1},8,["type"])):L("",!0)],32)}}}),K=I(H,[["__scopeId","data-v-3624dd70"]]),w=a=>(U("data-v-7eba824b"),a=a(),$(),a),Q={class:"input-box"},W=w(()=>e("label",null,"Correo",-1)),X={class:"input-box"},ee=w(()=>e("label",null,"Contraseña",-1)),oe=w(()=>e("div",{class:"remember-forgot"},[e("label",null,[e("input",{type:"checkbox"}),_(" Recuerdame ")]),e("a",{href:"#"},"¿Olvidaste tu contraseña?")],-1)),se=w(()=>e("button",{class:"btn",type:"submit"},"Login",-1)),te=C({__name:"LoguearUsuario",setup(a){const n=R.baseUrl,u=M(),r=v(""),l=v(""),o=v(""),f=O(),y=async()=>{try{const c={correoElectronico:r.value,contraseña:l.value},i=await fetch(`${n}/Usuario/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(!i.ok){const s=await i.json();throw new Error(s.message||"Error al iniciar sesión.")}const d=await i.json(),t={usuarioId:d.usuarioId,rol:d.rol,nombre:d.nombre,correoElectronico:d.correoElectronico,contraseña:d.contraseña};u.setUserInfo(t),r.value="",l.value="",o.value="Inicio Sesion Correctamente.",t.rol?f.push("/admin"):f.push("/")}catch(c){if(c instanceof Error)console.error(c),o.value=c.message||"Error al Iniciar Sesion.",setTimeout(()=>{o.value=""},2e3);else throw new Error(String(c))}};return(c,i)=>{const d=k("v-alert");return b(),S("form",{onSubmit:j(y,["prevent"])},[e("div",Q,[m(e("input",{type:"email","onUpdate:modelValue":i[0]||(i[0]=t=>r.value=t),required:""},null,512),[[g,r.value]]),W]),e("div",X,[m(e("input",{type:"password","onUpdate:modelValue":i[1]||(i[1]=t=>l.value=t),required:""},null,512),[[g,l.value]]),ee]),oe,se,o.value?(b(),T(d,{key:0,value:!0,type:o.value.includes("Correctamente")?"success":"error"},{default:V(()=>[_(N(o.value),1)]),_:1},8,["type"])):L("",!0)],32)}}}),ae=I(te,[["__scopeId","data-v-7eba824b"]]),q=a=>(U("data-v-52cb5697"),a=a(),$(),a),re={class:"form-box login"},ne=q(()=>e("h2",null,"Iniciar Sesion",-1)),le={class:"form-box register"},ie=q(()=>e("h2",null,"Registrar Cuenta",-1)),ue=C({__name:"LoginView",setup(a){const n=v(!1),u=()=>{n.value=!0},r=()=>{n.value=!1};return(l,o)=>(b(),S("main",null,[e("article",null,[e("section",null,[e("div",{class:P({wrapper:!0,active:n.value})},[e("div",re,[ne,E(ae),e("div",{class:"login-register"},[e("p",null,[_("¿No tienes una Cuenta?"),e("a",{href:"#",class:"register-link",onClick:u}," Registrarse")])])]),e("div",le,[ie,E(K),e("div",{class:"login-register"},[e("p",null,[_("¿Ya tienes una cuenta?"),e("a",{href:"#",class:"login-link",onClick:r}," Iniciar Sesion")])])])],2)])])]))}}),de=I(ue,[["__scopeId","data-v-52cb5697"]]);export{de as default};
