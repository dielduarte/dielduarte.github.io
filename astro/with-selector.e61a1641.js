import{r as E,g as $}from"./index.e25f4a10.js";var b={exports:{}},d={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var D=E,V=Symbol.for("react.element"),k=Symbol.for("react.fragment"),I=Object.prototype.hasOwnProperty,g=D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,L={key:!0,ref:!0,__self:!0,__source:!0};function j(r,e,o){var u,t={},n=null,a=null;o!==void 0&&(n=""+o),e.key!==void 0&&(n=""+e.key),e.ref!==void 0&&(a=e.ref);for(u in e)I.call(e,u)&&!L.hasOwnProperty(u)&&(t[u]=e[u]);if(r&&r.defaultProps)for(u in e=r.defaultProps,e)t[u]===void 0&&(t[u]=e[u]);return{$$typeof:V,type:r,key:n,ref:a,props:t,_owner:g.current}}d.Fragment=k;d.jsx=j;d.jsxs=j;b.exports=d;var ee=b.exports,w={exports:{}},R={},h={exports:{}},O={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i=E;function C(r,e){return r===e&&(r!==0||1/r===1/e)||r!==r&&e!==e}var P=typeof Object.is=="function"?Object.is:C,z=i.useState,F=i.useEffect,M=i.useLayoutEffect,N=i.useDebugValue;function T(r,e){var o=e(),u=z({inst:{value:o,getSnapshot:e}}),t=u[0].inst,n=u[1];return M(function(){t.value=o,t.getSnapshot=e,p(t)&&n({inst:t})},[r,o,e]),F(function(){return p(t)&&n({inst:t}),r(function(){p(t)&&n({inst:t})})},[r]),N(o),o}function p(r){var e=r.getSnapshot;r=r.value;try{var o=e();return!P(r,o)}catch{return!0}}function U(r,e){return e()}var G=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?U:T;O.useSyncExternalStore=i.useSyncExternalStore!==void 0?i.useSyncExternalStore:G;h.exports=O;var W=h.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m=E,A=W;function B(r,e){return r===e&&(r!==0||1/r===1/e)||r!==r&&e!==e}var J=typeof Object.is=="function"?Object.is:B,Y=A.useSyncExternalStore,H=m.useRef,K=m.useEffect,Q=m.useMemo,X=m.useDebugValue;R.useSyncExternalStoreWithSelector=function(r,e,o,u,t){var n=H(null);if(n.current===null){var a={hasValue:!1,value:null};n.current=a}else a=n.current;n=Q(function(){function y(f){if(!S){if(S=!0,l=f,f=u(f),t!==void 0&&a.hasValue){var s=a.value;if(t(s,f))return v=s}return v=f}if(s=v,J(l,f))return s;var x=u(f);return t!==void 0&&t(s,x)?(l=f,s):(l=f,v=x)}var S=!1,l,v,_=o===void 0?null:o;return[function(){return y(e())},_===null?void 0:function(){return y(_())}]},[e,o,u,t]);var c=Y(r,n[0],n[1]);return K(function(){a.hasValue=!0,a.value=c},[c]),X(c),c};w.exports=R;var Z=w.exports;const re=$(Z);export{ee as j,W as s,re as u};
