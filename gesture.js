export function measureHand(points){
 if(!points||points.length!==21)return null;
 const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
 const wrist=points[0], palm=Math.max(.02,dist(wrist,points[9]));
 const ratios=[8,12,16,20].map((tip,i)=>dist(points[tip],wrist)/Math.max(.02,dist(points[[5,9,13,17][i]],wrist)));
 const spread=Math.max(0,Math.min(1,(ratios.reduce((a,b)=>a+b,0)/4-1.05)/.9));
 return {openness:spread,x:(points[0].x+points[9].x)/2,palm};
}
export function zoomVelocity(open){return open>.72?.5:open<.28?-.5:0;}
