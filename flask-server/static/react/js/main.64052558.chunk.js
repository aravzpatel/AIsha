(this["webpackJsonpaisha-app"]=this["webpackJsonpaisha-app"]||[]).push([[0],{14:function(e,t,a){e.exports=a.p+"media/Intersect.cb816544.svg"},38:function(e,t,a){e.exports=a(68)},43:function(e,t,a){},46:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),l=a.n(o);a(43),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=a(2),s=a(3),c=a(6),u=a(4),m=a(5),d=a(14),g=a.n(d),p=a(31),h=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return console.log(this.props),r.a.createElement("div",{className:"welcome-container"},r.a.createElement(p.a,{src:g.a,alt:"Image",fluid:!0,width:"500",onClick:this.props.onClick}),r.a.createElement("div",{className:"welcome-content"},r.a.createElement("div",{className:"text_shadows"},"Hello, I'm AIsha")))}}]),a}(r.a.Component),b=a(37),f=(a(46),a(10)),v=a.n(f),E=a(8),y=a.n(E),w=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e))._isMounted=!1,n.state={loading:!0,result:"",trigger:!1},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0;var t=this.props.previousStep.message;y.a.post("/api/help",{user_text:t}).then((function(t){e._isMounted&&(console.log("We're inside the response"),console.log("We're about to setState"),e.setState({loading:!1,result:t.data.bot_response,trigger:!0},(function(){e.props.triggerNextStep()})))})).catch((function(e){console.log(e)}))}},{key:"componentWillUnmount",value:function(){console.log("We're about to componentWillUnmount"),this._isMounted=!1}},{key:"render",value:function(){var e=this.state,t=(e.trigger,e.loading),a=e.result;return r.a.createElement("div",{className:"dbpedia"},t?r.a.createElement(f.Loading,null):a)}}]),a}(n.Component);w.defaultProps={steps:void 0,triggerNextStep:void 0};var S=w,C=a(19),j=a(13),O=a(35);var k=function(e){var t,a=r.a.useMemo((function(){return{showPoints:!0}}),[]),n=r.a.useMemo((function(){return[{primary:!0,type:"time",position:"bottom"},{type:"linear",position:"left"}]}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(O.Chart,{data:(t=e.data,[{label:"Fear",data:Object(j.a)(new Array(7)).map((function(e,a){return{primary:new Date(t[a].year,t[a].month-1,t[a].day),secondary:t[a].moodscore.Fear}}))},{label:"Joy",data:Object(j.a)(new Array(7)).map((function(e,a){return{primary:new Date(t[a].year,t[a].month-1,t[a].day),secondary:t[a].moodscore.Joy}}))},{label:"Anger",data:Object(j.a)(new Array(7)).map((function(e,a){return{primary:new Date(t[a].year,t[a].month-1,t[a].day),secondary:t[a].moodscore.Anger}}))},{label:"Sadness",data:Object(j.a)(new Array(7)).map((function(e,a){return{primary:new Date(t[a].year,t[a].month-1,t[a].day),secondary:t[a].moodscore.Sadness}}))}]),series:a,axes:n,tooltip:!0,style:{width:"300px",height:"300px"}}))},_=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e))._isMounted=!1,n.state={loading:!0,result:"",trigger:!1},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0;var t=this.props.user_id;this.props.previousStep.message;y.a.post("http://127.0.0.1:5000/profile",{user_id:t}).then((function(t){e._isMounted&&e.setState({loading:!1,result:t.data,trigger:!0},(function(){console.log(e.state.result),e.props.triggerNextStep()}))})).catch((function(e){console.log(e)}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this.state,t=(e.trigger,e.loading);e.result;return r.a.createElement("div",{className:"graphcontainer"},t?r.a.createElement(f.Loading,null):r.a.createElement(k,{data:this.state.result}))}}]),a}(n.Component);_.defaultProps={steps:void 0,triggerNextStep:void 0};var x=_,A=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={user_id:1},n}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"chatagent-container"},r.a.createElement(C.ThemeProvider,{theme:{background:"#f5f8fb",fontFamily:"Sans Serif",headerBgColor:"#EF6C00",headerFontColor:"#fff",headerFontSize:"20px",botBubbleColor:"#0368F5",botFontColor:"#fff",botFontSize:"18px",userBubbleColor:"#EA8C55",userFontColor:"#fff"}},r.a.createElement(v.a,{headerTitle:"AIsha",botAvatar:g.a,steps:[{id:"1",message:"Hi, I'm AIsha",trigger:"2"},{id:"2",message:"I'm here to help you",trigger:"3"},{id:"3",message:"How are you feeling?",trigger:"emotion"},{id:"emotion",user:!0,trigger:"4"},{id:"4",component:r.a.createElement(S,{user_id:this.state.user_id}),waitAction:!0,asMessage:!0,trigger:"5"},{id:"5",message:function(e){e.steps;return"Thanks for telling me, son"},trigger:"6"},{id:"6",component:r.a.createElement(x,{user_id:this.state.user_id}),waitAction:!0,asMessage:!1,trigger:"7"},{id:"7",message:"Now stop",end:!0}]})))}}]),a}(r.a.Component),M=a(36),W=(a(67),r.a.Component),I={color:"red"},L=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).onChange=function(e){n.setState(Object(M.a)({},e.target.id,e.target.value))},n.changeView=function(e){n.setState({currentView:e,name:"",password:"",email:"",error:"",error_text:""})},n.currentView=function(){switch(n.state.currentView){case"signUp":return r.a.createElement("form",{onSubmit:n.onSubmitSignUp},r.a.createElement("h2",null,"Sign Up!"),r.a.createElement("fieldset",null,r.a.createElement("legend",null,"Create Account"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",{style:I},n.state.error_text)),r.a.createElement("li",null,r.a.createElement("label",null,"Name:",r.a.createElement("br",null),r.a.createElement("input",{type:"text",onChange:n.onChange,value:n.state.name,id:"name",required:!0}))),r.a.createElement("li",null,r.a.createElement("label",null,"Email:",r.a.createElement("br",null),r.a.createElement("input",{type:"email",onChange:n.onChange,value:n.state.email,id:"email",required:!0}))),r.a.createElement("li",null,r.a.createElement("label",null,"Password:",r.a.createElement("br",null),r.a.createElement("input",{type:"password",onChange:n.onChange,value:n.state.password,id:"password",required:!0}))))),r.a.createElement("button",null,"Submit"),r.a.createElement("button",{type:"button",onClick:function(){return n.changeView("logIn")}},"Have an Account?"));case"logIn":return r.a.createElement("form",{onSubmit:n.onSubmitLogin},r.a.createElement("h2",null,"Welcome Back!"),r.a.createElement("fieldset",null,r.a.createElement("legend",null,"Log In"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",{style:I},n.state.error_text)),r.a.createElement("li",null,r.a.createElement("label",null,"Email:",r.a.createElement("br",null),r.a.createElement("input",{type:"email",id:"email",onChange:n.onChange,value:n.state.email,required:!0}))),r.a.createElement("li",null,r.a.createElement("label",null,"Password:",r.a.createElement("br",null),r.a.createElement("input",{type:"password",id:"password",onChange:n.onChange,value:n.state.password,required:!0}))))),r.a.createElement("button",null,"Login"),r.a.createElement("button",{type:"button",onClick:function(){return n.changeView("signUp")}},"Create an Account"))}},n.state={currentView:"signUp",name:"",password:"",email:"",error:"",error_text:""},n.onSubmitSignUp=n.onSubmitSignUp.bind(Object(c.a)(n)),n.onSubmitLogin=n.onSubmitLogin.bind(Object(c.a)(n)),n.onChange=n.onChange.bind(Object(c.a)(n)),n}return Object(s.a)(a,[{key:"onSubmitSignUp",value:function(e){var t=this;e.preventDefault();var a=this.state.email,n=this.state.name,r=this.state.password;y.a.post("http://127.0.0.1:5000/signup",{email:a,name:n,password:r}).then((function(e){console.log("sign up response recieved"),console.log(e.data.error),console.log(e.data.data),!0===e.data.error?t.setState({error:!0,error_text:e.data.data}):t.props.success()})).catch((function(e){console.log(e)}))}},{key:"onSubmitLogin",value:function(e){var t=this;e.preventDefault();var a=this.state.email,n=this.state.password;y.a.post("http://127.0.0.1:5000/login",{email:a,password:n}).then((function(e){console.log("login response recieved"),console.log(e.data.error),console.log(e.data.data),!0===e.data.error?t.setState({error:!0,error_text:e.data.data}):t.props.success()})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return r.a.createElement("section",{id:"entry-page"},this.currentView())}}]),a}(W),N=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={welcome:!0,chat:!1},n.changeWelcome=n.changeWelcome.bind(Object(c.a)(n)),n.changeLogin=n.changeLogin.bind(Object(c.a)(n)),n}return Object(s.a)(a,[{key:"changeWelcome",value:function(){this.setState({welcome:!1})}},{key:"changeLogin",value:function(){this.setState({chat:!0})}},{key:"render",value:function(){var e=r.a.createElement(h,{onClick:this.changeWelcome}),t=null,a=null;return!1===this.state.welcome&&(e=null,t=r.a.createElement(L,{success:this.changeLogin})),!0===this.state.chat&&(t=null,a=r.a.createElement(A,null)),r.a.createElement(b.a,null,e,t,a)}}]),a}(r.a.Component);l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.64052558.chunk.js.map