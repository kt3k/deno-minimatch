//@ts-ignore
import*as path from"https://deno.land/x/path/index.ts";var concatMap=function(xs,fn){for(var res=[],i=0;i<xs.length;i++){var x=fn(xs[i],i);isArray(x)?res.push.apply(res,x):res.push(x)}return res},isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)},balancedMatch=balanced;function balanced(a,b,str){a instanceof RegExp&&(a=maybeMatch(a,str)),b instanceof RegExp&&(b=maybeMatch(b,str));var r=range(a,b,str);return r&&{start:r[0],end:r[1],pre:str.slice(0,r[0]),body:str.slice(r[0]+a.length,r[1]),post:str.slice(r[1]+b.length)}}function maybeMatch(reg,str){var m=str.match(reg);return m?m[0]:null}function range(a,b,str){var begs,beg,left,right,result,ai=str.indexOf(a),bi=str.indexOf(b,ai+1),i=ai;if(ai>=0&&bi>0){for(begs=[],left=str.length;i>=0&&!result;)i==ai?(begs.push(i),ai=str.indexOf(a,i+1)):1==begs.length?result=[begs.pop(),bi]:((beg=begs.pop())<left&&(left=beg,right=bi),bi=str.indexOf(b,i+1)),i=ai<bi&&ai>=0?ai:bi;begs.length&&(result=[left,right])}return result}balanced.range=range;var braceExpansion=expandTop,escSlash="\0SLASH"+Math.random()+"\0",escOpen="\0OPEN"+Math.random()+"\0",escClose="\0CLOSE"+Math.random()+"\0",escComma="\0COMMA"+Math.random()+"\0",escPeriod="\0PERIOD"+Math.random()+"\0";function numeric(str){return parseInt(str,10)==str?parseInt(str,10):str.charCodeAt(0)}function escapeBraces(str){return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod)}function unescapeBraces(str){return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".")}function parseCommaParts(str){if(!str)return[""];var parts=[],m=balancedMatch("{","}",str);if(!m)return str.split(",");var pre=m.pre,body=m.body,post=m.post,p=pre.split(",");p[p.length-1]+="{"+body+"}";var postParts=parseCommaParts(post);return post.length&&(p[p.length-1]+=postParts.shift(),p.push.apply(p,postParts)),parts.push.apply(parts,p),parts}function expandTop(str){return str?("{}"===str.substr(0,2)&&(str="\\{\\}"+str.substr(2)),expand(escapeBraces(str),!0).map(unescapeBraces)):[]}function embrace(str){return"{"+str+"}"}function isPadded(el){return/^-?0\d/.test(el)}function lte(i,y){return i<=y}function gte(i,y){return i>=y}function expand(str,isTop){var expansions=[],m=balancedMatch("{","}",str);if(!m||/\$$/.test(m.pre))return[str];var n,isNumericSequence=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body),isAlphaSequence=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body),isSequence=isNumericSequence||isAlphaSequence,isOptions=m.body.indexOf(",")>=0;if(!isSequence&&!isOptions)return m.post.match(/,.*\}/)?expand(str=m.pre+"{"+m.body+escClose+m.post):[str];if(isSequence)n=m.body.split(/\.\./);else if(1===(n=parseCommaParts(m.body)).length&&1===(n=expand(n[0],!1).map(embrace)).length)return(post=m.post.length?expand(m.post,!1):[""]).map(function(p){return m.pre+n[0]+p});var N,pre=m.pre,post=m.post.length?expand(m.post,!1):[""];if(isSequence){var x=numeric(n[0]),y=numeric(n[1]),width=Math.max(n[0].length,n[1].length),incr=3==n.length?Math.abs(numeric(n[2])):1,test=lte;y<x&&(incr*=-1,test=gte);var pad=n.some(isPadded);N=[];for(var i=x;test(i,y);i+=incr){var c;if(isAlphaSequence)"\\"===(c=String.fromCharCode(i))&&(c="");else if(c=String(i),pad){var need=width-c.length;if(need>0){var z=new Array(need+1).join("0");c=i<0?"-"+z+c.slice(1):z+c}}N.push(c)}}else N=concatMap(n,function(el){return expand(el,!1)});for(var j=0;j<N.length;j++)for(var k=0;k<post.length;k++){var expansion=pre+N[j]+post[k];(!isTop||isSequence||expansion)&&expansions.push(expansion)}return expansions}var minimatch_1=minimatch;minimatch.Minimatch=Minimatch;var path$1={sep:"/"};try{path$1=path}catch(er){}var GLOBSTAR=minimatch.GLOBSTAR=Minimatch.GLOBSTAR={},plTypes={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},qmark="[^/]",star=qmark+"*?",twoStarDot="(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",twoStarNoDot="(?:(?!(?:\\/|^)\\.).)*?",reSpecials=charSet("().*{}+?[]^$\\!");function charSet(s){return s.split("").reduce(function(set,c){return set[c]=!0,set},{})}var slashSplit=/\/+/;function filter(pattern,options){return options=options||{},function(p,i,list){return minimatch(p,pattern,options)}}function ext(a,b){a=a||{},b=b||{};var t={};return Object.keys(b).forEach(function(k){t[k]=b[k]}),Object.keys(a).forEach(function(k){t[k]=a[k]}),t}function minimatch(p,pattern,options){if("string"!=typeof pattern)throw new TypeError("glob pattern string required");return options||(options={}),!(!options.nocomment&&"#"===pattern.charAt(0))&&(""===pattern.trim()?""===p:new Minimatch(pattern,options).match(p))}function Minimatch(pattern,options){if(!(this instanceof Minimatch))return new Minimatch(pattern,options);if("string"!=typeof pattern)throw new TypeError("glob pattern string required");options||(options={}),pattern=pattern.trim(),"/"!==path$1.sep&&(pattern=pattern.split(path$1.sep).join("/")),this.options=options,this.set=[],this.pattern=pattern,this.regexp=null,this.negate=!1,this.comment=!1,this.empty=!1,this.make()}function make(){if(!this._made){var pattern=this.pattern,options=this.options;if(options.nocomment||"#"!==pattern.charAt(0))if(pattern){this.parseNegate();var set=this.globSet=this.braceExpand();options.debug&&(this.debug=console.error),this.debug(this.pattern,set),set=this.globParts=set.map(function(s){return s.split(slashSplit)}),this.debug(this.pattern,set),set=set.map(function(s,si,set){return s.map(this.parse,this)},this),this.debug(this.pattern,set),set=set.filter(function(s){return-1===s.indexOf(!1)}),this.debug(this.pattern,set),this.set=set}else this.empty=!0;else this.comment=!0}}function parseNegate(){var pattern=this.pattern,negate=!1,negateOffset=0;if(!this.options.nonegate){for(var i=0,l=pattern.length;i<l&&"!"===pattern.charAt(i);i++)negate=!negate,negateOffset++;negateOffset&&(this.pattern=pattern.substr(negateOffset)),this.negate=negate}}function braceExpand(pattern,options){if(options||(options=this instanceof Minimatch?this.options:{}),void 0===(pattern=void 0===pattern?this.pattern:pattern))throw new TypeError("undefined pattern");return options.nobrace||!pattern.match(/\{.*\}/)?[pattern]:braceExpansion(pattern)}minimatch.filter=filter,minimatch.defaults=function(def){if(!def||!Object.keys(def).length)return minimatch;var orig=minimatch,m=function(p,pattern,options){return orig.minimatch(p,pattern,ext(def,options))};return m.Minimatch=function(pattern,options){return new orig.Minimatch(pattern,ext(def,options))},m},Minimatch.defaults=function(def){return def&&Object.keys(def).length?minimatch.defaults(def).Minimatch:Minimatch},Minimatch.prototype.debug=function(){},Minimatch.prototype.make=make,Minimatch.prototype.parseNegate=parseNegate,minimatch.braceExpand=function(pattern,options){return braceExpand(pattern,options)},Minimatch.prototype.braceExpand=braceExpand,Minimatch.prototype.parse=parse;var SUBPARSE={};function parse(pattern,isSub){if(pattern.length>65536)throw new TypeError("pattern is too long");var options=this.options;if(!options.noglobstar&&"**"===pattern)return GLOBSTAR;if(""===pattern)return"";var stateChar,re="",hasMagic=!!options.nocase,escaping=!1,patternListStack=[],negativeLists=[],inClass=!1,reClassStart=-1,classStart=-1,patternStart="."===pattern.charAt(0)?"":options.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)",self=this;function clearStateChar(){if(stateChar){switch(stateChar){case"*":re+=star,hasMagic=!0;break;case"?":re+=qmark,hasMagic=!0;break;default:re+="\\"+stateChar}self.debug("clearStateChar %j %j",stateChar,re),stateChar=!1}}for(var c,i=0,len=pattern.length;i<len&&(c=pattern.charAt(i));i++)if(this.debug("%s\t%s %s %j",pattern,i,re,c),escaping&&reSpecials[c])re+="\\"+c,escaping=!1;else switch(c){case"/":return!1;case"\\":clearStateChar(),escaping=!0;continue;case"?":case"*":case"+":case"@":case"!":if(this.debug("%s\t%s %s %j <-- stateChar",pattern,i,re,c),inClass){this.debug("  in class"),"!"===c&&i===classStart+1&&(c="^"),re+=c;continue}self.debug("call clearStateChar %j",stateChar),clearStateChar(),stateChar=c,options.noext&&clearStateChar();continue;case"(":if(inClass){re+="(";continue}if(!stateChar){re+="\\(";continue}patternListStack.push({type:stateChar,start:i-1,reStart:re.length,open:plTypes[stateChar].open,close:plTypes[stateChar].close}),re+="!"===stateChar?"(?:(?!(?:":"(?:",this.debug("plType %j %j",stateChar,re),stateChar=!1;continue;case")":if(inClass||!patternListStack.length){re+="\\)";continue}clearStateChar(),hasMagic=!0;var pl=patternListStack.pop();re+=pl.close,"!"===pl.type&&negativeLists.push(pl),pl.reEnd=re.length;continue;case"|":if(inClass||!patternListStack.length||escaping){re+="\\|",escaping=!1;continue}clearStateChar(),re+="|";continue;case"[":if(clearStateChar(),inClass){re+="\\"+c;continue}inClass=!0,classStart=i,reClassStart=re.length,re+=c;continue;case"]":if(i===classStart+1||!inClass){re+="\\"+c,escaping=!1;continue}if(inClass)var sp,cs=pattern.substring(classStart+1,i);hasMagic=!0,inClass=!1,re+=c;continue;default:clearStateChar(),escaping?escaping=!1:!reSpecials[c]||"^"===c&&inClass||(re+="\\"),re+=c}for(inClass&&(cs=pattern.substr(classStart+1),sp=this.parse(cs,SUBPARSE),re=re.substr(0,reClassStart)+"\\["+sp[0],hasMagic=hasMagic||sp[1]),pl=patternListStack.pop();pl;pl=patternListStack.pop()){var tail=re.slice(pl.reStart+pl.open.length);this.debug("setting tail",re,pl),tail=tail.replace(/((?:\\{2}){0,64})(\\?)\|/g,function(_,$1,$2){return $2||($2="\\"),$1+$1+$2+"|"}),this.debug("tail=%j\n   %s",tail,tail,pl,re);var t="*"===pl.type?star:"?"===pl.type?qmark:"\\"+pl.type;hasMagic=!0,re=re.slice(0,pl.reStart)+t+"\\("+tail}clearStateChar(),escaping&&(re+="\\\\");var addPatternStart=!1;switch(re.charAt(0)){case".":case"[":case"(":addPatternStart=!0}for(var n=negativeLists.length-1;n>-1;n--){var nl=negativeLists[n],nlBefore=re.slice(0,nl.reStart),nlFirst=re.slice(nl.reStart,nl.reEnd-8),nlLast=re.slice(nl.reEnd-8,nl.reEnd),nlAfter=re.slice(nl.reEnd);nlLast+=nlAfter;var openParensBefore=nlBefore.split("(").length-1,cleanAfter=nlAfter;for(i=0;i<openParensBefore;i++)cleanAfter=cleanAfter.replace(/\)[+*?]?/,"");var dollar="";""===(nlAfter=cleanAfter)&&isSub!==SUBPARSE&&(dollar="$"),re=nlBefore+nlFirst+nlAfter+dollar+nlLast}if(""!==re&&hasMagic&&(re="(?=.)"+re),addPatternStart&&(re=patternStart+re),isSub===SUBPARSE)return[re,hasMagic];if(!hasMagic)return globUnescape(pattern);var flags=options.nocase?"i":"";try{var regExp=new RegExp("^"+re+"$",flags)}catch(er){return new RegExp("$.")}return regExp._glob=pattern,regExp._src=re,regExp}function makeRe(){if(this.regexp||!1===this.regexp)return this.regexp;var set=this.set;if(!set.length)return this.regexp=!1,this.regexp;var options=this.options,twoStar=options.noglobstar?star:options.dot?twoStarDot:twoStarNoDot,flags=options.nocase?"i":"",re=set.map(function(pattern){return pattern.map(function(p){return p===GLOBSTAR?twoStar:"string"==typeof p?regExpEscape(p):p._src}).join("\\/")}).join("|");re="^(?:"+re+")$",this.negate&&(re="^(?!"+re+").*$");try{this.regexp=new RegExp(re,flags)}catch(ex){this.regexp=!1}return this.regexp}function match(f,partial){if(this.debug("match",f,this.pattern),this.comment)return!1;if(this.empty)return""===f;if("/"===f&&partial)return!0;var options=this.options;"/"!==path$1.sep&&(f=f.split(path$1.sep).join("/")),f=f.split(slashSplit),this.debug(this.pattern,"split",f);var filename,i,set=this.set;for(this.debug(this.pattern,"set",set),i=f.length-1;i>=0&&!(filename=f[i]);i--);for(i=0;i<set.length;i++){var pattern=set[i],file=f;if(options.matchBase&&1===pattern.length&&(file=[filename]),this.matchOne(file,pattern,partial))return!!options.flipNegate||!this.negate}return!options.flipNegate&&this.negate}function globUnescape(s){return s.replace(/\\(.)/g,"$1")}function regExpEscape(s){return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}minimatch.makeRe=function(pattern,options){return new Minimatch(pattern,options||{}).makeRe()},Minimatch.prototype.makeRe=makeRe,minimatch.match=function(list,pattern,options){var mm=new Minimatch(pattern,options=options||{});return list=list.filter(function(f){return mm.match(f)}),mm.options.nonull&&!list.length&&list.push(pattern),list},Minimatch.prototype.match=match,Minimatch.prototype.matchOne=function(file,pattern,partial){var options=this.options;this.debug("matchOne",{this:this,file:file,pattern:pattern}),this.debug("matchOne",file.length,pattern.length);for(var fi=0,pi=0,fl=file.length,pl=pattern.length;fi<fl&&pi<pl;fi++,pi++){this.debug("matchOne loop");var hit,p=pattern[pi],f=file[fi];if(this.debug(pattern,p,f),!1===p)return!1;if(p===GLOBSTAR){this.debug("GLOBSTAR",[pattern,p,f]);var fr=fi,pr=pi+1;if(pr===pl){for(this.debug("** at the end");fi<fl;fi++)if("."===file[fi]||".."===file[fi]||!options.dot&&"."===file[fi].charAt(0))return!1;return!0}for(;fr<fl;){var swallowee=file[fr];if(this.debug("\nglobstar while",file,fr,pattern,pr,swallowee),this.matchOne(file.slice(fr),pattern.slice(pr),partial))return this.debug("globstar found match!",fr,fl,swallowee),!0;if("."===swallowee||".."===swallowee||!options.dot&&"."===swallowee.charAt(0)){this.debug("dot detected!",file,fr,pattern,pr);break}this.debug("globstar swallow a segment, and continue"),fr++}return!(!partial||(this.debug("\n>>> no match, partial?",file,fr,pattern,pr),fr!==fl))}if("string"==typeof p?(hit=options.nocase?f.toLowerCase()===p.toLowerCase():f===p,this.debug("string match",p,f,hit)):(hit=f.match(p),this.debug("pattern match",p,f,hit)),!hit)return!1}if(fi===fl&&pi===pl)return!0;if(fi===fl)return partial;if(pi===pl)return fi===fl-1&&""===file[fi];throw new Error("wtf?")};export default minimatch_1;