!function(){"use strict";var t;!function(t){t.Stopped="STOP",t.Paused="PAUSE",t.Running="RUN"}(t||(t={}));const n={STOP:63488,PAUSE:65504,RUN:2016};function e(t,n,e){g.setColor(0),g.fillRect(n-60,e,n+60,e+30),g.setColor(65535),g.drawString(t,n,e)}function i(i){var s;g.setFontVector(30),g.setFontAlign(0,-1,0),e((i.distance/1e3).toFixed(2),60,55),e(function(t){const n=Math.round(t),e=Math.floor(n/3600),i=Math.floor(n/60)%60,s=n%60;return(e?e+":":"")+("0"+i).substr(-2)+":"+("0"+s).substr(-2)}(i.duration),172,55),e(function(t){if(t<.1667)return"__'__\"";const n=Math.round(1e3/t),e=Math.floor(n/60),i=n%60;return("0"+e).substr(-2)+"'"+("0"+i).substr(-2)+'"'}(i.speed),60,115),e(i.hr.toFixed(0),172,115),e(i.steps.toFixed(0),60,175),e(i.cadence.toFixed(0),172,175),g.setFont("6x8",2),g.setColor(i.gpsValid?2016:63488),g.fillRect(0,216,80,240),g.setColor(0),g.drawString("GPS",40,220),g.setColor(65535),g.fillRect(80,216,160,240),g.setColor(0),g.drawString(("0"+(s=new Date).getHours()).substr(-2)+":"+("0"+s.getMinutes()).substr(-2),120,220),g.setColor(n[i.status]),g.fillRect(160,216,230,240),g.setColor(0),g.drawString(i.status,200,220),g.setFont("6x8").setFontAlign(0,0,1).setColor(-1),i.status===t.Paused?g.drawString("START",236,60,1).drawString(" CLEAR ",236,180,1):i.status===t.Running?g.drawString(" PAUSE ",236,60,1).drawString(" PAUSE ",236,180,1):g.drawString("START",236,60,1).drawString("      ",236,180,1)}function s(t){g.clear(),g.setColor(50712),g.setFont("6x8",2),g.setFontAlign(0,-1,0),g.drawString("DIST (KM)",60,32),g.drawString("TIME",180,32),g.drawString("PACE",60,92),g.drawString("HEART",180,92),g.drawString("STEPS",60,152),g.drawString("CADENCE",180,152),i(t),Bangle.drawWidgets()}function a(n){n.status===t.Stopped&&function(t){const n=(new Date).toISOString().replace(/[-:]/g,""),e=`banglerun_${n.substr(2,6)}_${n.substr(9,6)}`;t.file=require("Storage").open(e,"w"),t.fileWritten=!1}(n),n.status===t.Running?n.status=t.Paused:n.status=t.Running,i(n)}const r={fix:NaN,lat:NaN,lon:NaN,alt:NaN,vel:NaN,dop:NaN,gpsValid:!1,x:NaN,y:NaN,z:NaN,t:NaN,timeSinceLog:0,hr:60,hrError:100,file:null,fileWritten:!1,drawing:!1,status:t.Stopped,duration:0,distance:0,speed:0,steps:0,cadence:0};var o;o=r,Bangle.on("GPS",n=>function(n,e){n.lat=e.lat,n.lon=e.lon,n.alt=e.alt,n.vel=e.speed/3.6,n.fix=e.fix,n.dop=e.hdop,n.gpsValid=n.fix>0,function(n){const e=Date.now();let i=(e-n.t)/1e3;if(isFinite(i)||(i=0),n.t=e,n.timeSinceLog+=i,n.status===t.Running&&(n.duration+=i),!n.gpsValid)return;const s=6371008.8+n.alt,a=n.lat*Math.PI/180,r=n.lon*Math.PI/180,o=s*Math.cos(a)*Math.cos(r),g=s*Math.cos(a)*Math.sin(r),d=s*Math.sin(a);if(!n.x)return n.x=o,n.y=g,void(n.z=d);const u=o-n.x,l=g-n.y,c=d-n.z,f=Math.sqrt(u*u+l*l+c*c);n.x=o,n.y=g,n.z=d,n.status===t.Running&&(n.distance+=f,n.speed=n.distance/n.duration||0,n.cadence=60*n.steps/n.duration||0)}(n),i(n),n.gpsValid&&n.status===t.Running&&n.timeSinceLog>5&&(n.timeSinceLog=0,function(t){t.fileWritten||(t.file.write(["timestamp","latitude","longitude","altitude","duration","distance","heartrate","steps"].join(",")+"\n"),t.fileWritten=!0),t.file.write([Date.now().toFixed(0),t.lat.toFixed(6),t.lon.toFixed(6),t.alt.toFixed(2),t.duration.toFixed(0),t.distance.toFixed(2),t.hr.toFixed(0),t.steps.toFixed(0)].join(",")+"\n")}(n))}(o,n)),Bangle.setGPSPower(1),function(t){Bangle.on("HRM",n=>function(t,n){if(0===n.confidence)return;const e=n.bpm-t.hr,i=Math.abs(e)+101-n.confidence,s=t.hrError/(t.hrError+i)||0;t.hr+=e*s,t.hrError+=(i-t.hrError)*s}(t,n)),Bangle.setHRMPower(1)}(r),function(n){Bangle.on("step",()=>function(n){n.status===t.Running&&(n.steps+=1)}(n))}(r),function(t){Bangle.loadWidgets(),Bangle.on("lcdPower",n=>{t.drawing=n,n&&s(t)}),s(t)}(r),setWatch(()=>a(r),BTN1,{repeat:!0,edge:"falling"}),setWatch(()=>function(n){n.status===t.Paused&&function(t){t.duration=0,t.distance=0,t.speed=0,t.steps=0,t.cadence=0}(n),n.status===t.Running?n.status=t.Paused:n.status=t.Stopped,i(n)}(r),BTN3,{repeat:!0,edge:"falling"})}();