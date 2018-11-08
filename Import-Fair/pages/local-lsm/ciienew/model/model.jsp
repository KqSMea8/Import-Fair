<!DOCTYPE html>
<html lang="en">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%> 
		<title>国家会展中心</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				font-family: Monospace;
				background-color: #000;
				color: #fff;
				margin: 0px;
				overflow: hidden;
			}
			#info {
				color: #fff;
				position: absolute;
				top: 10px;
				width: 100%;
				text-align: center;
				z-index: 100;
				display:block;
			}
			#info a {
				color: #046;
				font-weight: bold;
			}
			.map-info-win{
				background:rgba(1,0,69,0.65);
				border:solid 5px #2a28b3;
				border-radius:5px;
				padding:0px;
				font-size:28px;
			}
			.map-info-win-title{
				border-bottom:solid 3px #2a28b3;
			}
			.map-info-win>div{
				padding:10px 40px 10px 40px;
			}
			.renderKpiSelector{
				cursor:pointer;
			}
		</style>
	</head>

	<body class="bgC">
		<div id="ctrlPanel" style="z-index:101;position:absolute;right:0px;top:0px;display:block;">
			<div>
				<button type="button" class="btn btn-primary btn-xs active" onclick="orbitCtrl();">环绕中心</button>
	  			<button type="button" class="btn btn-default btn-xs " onclick="freeCamera();">自由镜头</button>
			</div>
		</div>
		
		<div style="padding:40px;z-index:101;position:absolute;left:40px;top:110px;display:block;">
			<div id="infoPanel" class="map-info-win" >
				<div class="map-info-win-title">
					<span id="EXP">J-7H WiFi运行情况</span>
				</div>
				<div class="" >
					<span>馆层:</span><span id="building_level">--</span><span>人</span>
				</div>
				<div class="" >
					<span>展览名称:</span><span id="scene_name">--</span><span>人</span>
				</div>
				<div class="" >
					<span>用户数:</span><span id="wifiusers">--</span><span>人</span>
				</div>
				<div class="" >
					<span>上行流量:</span><span id="wifiups">--</span><span>GB</span>
				</div>
				<div class="" >
					<span>下行流量:</span><span id="wifidowns">--</span><span>GB</span>
				</div>
			</div>
			<div id="infoPanel2" class="map-info-win" style="margin-top:20px;" >
				<div class="map-info-win-title">
					<span >J-7H 指标概览</span>
				</div>
				<div class="renderKpiSelector" kpiName="用户数" kpiKey="s_091">
					<span>用户数:</span><span id="s_091">--</span><span>人</span>
				</div>
				<div class="renderKpiSelector" kpiName="流量" kpiKey="s_083">
					<span>流量:</span><span id="s_083">--</span><span>MB</span>
				</div>
				<div class="renderKpiSelector" kpiName="话务量" kpiKey="hwl">
					<span>话务量:</span><span id="hwl">--</span><span>Erl</span>
				</div>
			</div>
			
			<div id="legend" class="map-info-win" style="overflow:hidden;margin-top:20px;height:72px;" >
				<div class="map-info-win-title" style="line-height:42px;">
					<span >分区指标</span>
					<span id="triMark" onclick="cellKpiCtrl();" style="font-size:36px;cursor:pointer;">▾</span>
				</div>
				<div>
					<button type="button" class="kpibtn btn btn-primary btn-xl active" kpiName="用户数" kpiKey="s_091">用户数</button>
	  				<button type="button" class="kpibtn btn btn-default btn-xl" kpiName="流量" kpiKey="s_083">流量</button>
	  				<button type="button" class="kpibtn btn btn-default btn-xl" kpiName="话务量" kpiKey="hwl">话务量</button>
				</div>
				<div style="width:100%;margin-top:10px;" >
					<div style="width:36px;height:36px;float:left;background:#ff5252;border-radius:5px;"></div>
					<div style="float:left;" id="lv1"></div>
					<div style="clear:both;"></div>
				</div>
				<div style="width:100%;margin-top:10px;" >
					<div style="width:36px;height:36px;float:left;background:#ff933c;border-radius:5px;"></div>
					<div style="float:left;" id="lv2"></div>
					<div style="clear:both;"></div>
				</div>
				<div style="width:100%;margin-top:10px;" >
					<div style="width:36px;height:36px;float:left;background:#fff066;border-radius:5px;"></div>
					<div style="float:left;" id="lv3"></div>
					<div style="clear:both;"></div>
				</div>
				<div style="width:100%;margin-top:10px;" >
					<div style="width:36px;height:36px;float:left;background:#00ffaa;border-radius:5px;"></div>
					<div style="float:left;" id="lv4"></div>
					<div style="clear:both;"></div>
				</div>
				<div style="clear:both;"></div>
			</div>
		</div>
		
		<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:740px;">
				<div class="modal-content" >
					<div class="modal-header" style="border-bottom:none;display:none;">
						<h4 class="modal-title" id="modalWinTitle" style="font-size:32px;">
						</h4>
					</div>
					<div class="modal-body" id="modalWinBody" style="width:100%;height:500px;overflow:hidden;">
						<iframe id="kpiFrame" src="" width="680px" frameborder=no height="460px"></iframe>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
			
		<script src="build/three.js"></script>

		<script src="js/libs/inflate.min.js"></script>
		<script src="js/loaders/FBXLoader.js"></script>

		<script src="js/controls/OrbitControls.js"></script>
		<script src="js/objects/Sky.js"></script>
		<script src="js/Detector.js"></script>
		<script src="js/libs/stats.min.js"></script>
		<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
		<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
		<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
		<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
		<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />		

		
		<script>
			var BASEPATH="${ctx}";
			var HOTSPOT='J-7H-2层';
			var EXP='J-7H';
			var CURRENT_KPI_KEY='s_091';
			var CLICK_OBJS=[];
			var KPI_CACHE=[];
			var CELL_MAP={};
			var CELL_LIST=[
["中国博览会会展中心C0NL19W_130","12","4G"],
["中国博览会会展中心C0NL19W_136","11","4G"],
["中国博览会会展中心C0NL19W_129","14","4G"],
["中国博览会会展中心C0NL19W_135","13","4G"],
["中国博览会会展中心C0NL5W_33","9,10","4G"],
["中国博览会会展中心C0NL5W_43","8","4G"],
["中国博览会会展中心C0ND05W_1","16,17","2G"],
["中国博览会会展中心C0NG014W_1","15","2G"],
["中国博览会会展中心C0NL22W_1","6,7","4G"],
["中国博览会会展中心C0NL22W_4","18,19","4G"],
["中国博览会会展中心C0NL7W_33","4,5","4G"],
["中国博览会会展中心C0NL7W_43","3","4G"],
["中国博览会会展中心C0ND04W_1","21,22","2G"],
["中国博览会会展中心C0NG013W_1","20","2G"],
["中国博览会会展中心C0NL19W_134","2","4G"],
["中国博览会会展中心C0NL19W_140","1","4G"],
["中国博览会会展中心C0NL19W_133","24","4G"],
["中国博览会会展中心C0NL19W_139","23","4G"],
["中国博览会会展中心C0NL20W_130","12","4G"],
["中国博览会会展中心C0NL20W_136","11","4G"],
["中国博览会会展中心C0NL20W_129","14","4G"],
["中国博览会会展中心C0NL20W_135","13","4G"],
["中国博览会会展中心C0NL8W_33","9,10","4G"],
["中国博览会会展中心C0NL8W_43","8","4G"],
["中国博览会会展中心C0ND03W_1","16,17","2G"],
["中国博览会会展中心C0NG012W_1","15","2G"],
["中国博览会会展中心C0NL22W_2","6,7","4G"],
["中国博览会会展中心C0NL22W_5","18,19","4G"],
["中国博览会会展中心C0NL9W_33","4,5","4G"],
["中国博览会会展中心C0NL9W_43","3","4G"],
["中国博览会会展中心C0ND02W_1","21,22","2G"],
["中国博览会会展中心C0NG011W_1","20","2G"],
["中国博览会会展中心C0NL20W_134","2","4G"],
["中国博览会会展中心C0NL20W_140","1","4G"],
["中国博览会会展中心C0NL20W_133","24","4G"],
["中国博览会会展中心C0NL20W_139","23","4G"],
["中国博览会会展中心C0NL17W_130","14","4G"],
["中国博览会会展中心C0NL17W_136","13","4G"],
["中国博览会会展中心C0NL17W_129","12","4G"],
["中国博览会会展中心C0NL17W_135","11","4G"],
["中国博览会会展中心C0NL2W_33","9,10","4G"],
["中国博览会会展中心C0NL2W_43","8","4G"],
["中国博览会会展中心C0ND08W_1","16,17","2G"],
["中国博览会会展中心C0NG017W_1","15","2G"],
["中国博览会会展中心C0NL23W_1","6,7","4G"],
["中国博览会会展中心C0NL23W_4","18,19","4G"],
["中国博览会会展中心C0NL1W_33","4,5","4G"],
["中国博览会会展中心C0NL1W_43","3","4G"],
["中国博览会会展中心C0ND09W_1","21,22","2G"],
["中国博览会会展中心C0NG019W_1","20","2G"],
["中国博览会会展中心C0NL17W_133","24","4G"],
["中国博览会会展中心C0NL17W_139","23","4G"],
["中国博览会会展中心C0NL17W_134","2","4G"],
["中国博览会会展中心C0NL17W_140","1","4G"],
["中国博览会会展中心C0NL18W_130","14","4G"],
["中国博览会会展中心C0NL18W_136","13","4G"],
["中国博览会会展中心C0NL18W_129","12","4G"],
["中国博览会会展中心C0NL18W_135","11","4G"],
["中国博览会会展中心C0NL4W_33","9,10","4G"],
["中国博览会会展中心C0NL4W_43","8","4G"],
["中国博览会会展中心C0ND06W_1","16,17","2G"],
["中国博览会会展中心C0NG015W_1","15","2G"],
["中国博览会会展中心C0NL23W_2","6,7","4G"],
["中国博览会会展中心C0NL23W_5","18,19","4G"],
["中国博览会会展中心C0NL3W_33","4,5","4G"],
["中国博览会会展中心C0NL3W_43","3","4G"],
["中国博览会会展中心C0ND07W_1","21,22","2G"],
["中国博览会会展中心C0NG016W_1","20","2G"],
["中国博览会会展中心C0NL18W_133","24","4G"],
["中国博览会会展中心C0NL18W_139","23","4G"],
["中国博览会会展中心C0NL18W_134","2","4G"],
["中国博览会会展中心C0NL18W_140","1","4G"]
];
			
			var CAMERA_MAP={
				'南广场正中':{x:685.1529765377911,y:460.0899227711982,z:911.3142551956929},
				'7.1H外':{x:497.77442425142954,y:205.53752166064345,z:77.17264512576486},
				'7.1H中':{x:379.0791834418587,y:205.53752166064345,z:90.90048671269544},
				'7.1H内':{x:268.1917768350277,y:205.53752166064345,z:59.894954044937734},
				'8.1H内':{x:268.7444565520718,y:205.53752166064345,z:-91.30403584960598},
				'8.1H中':{x:382.1436989729799,y:205.53752166064345,z:-90.88952606182266},
				'8.1H外':{x:461.94316586176683,y:205.53752166064345,z:-90.59783398893813},
				'1H外':{x:108.19267235607923,y:205.53752166064345,z:-492.0351062652188},
				'1H内':{x:100.85791023672535,y:205.53752166064345,z:-301.3761404003728},
				'2H内':{x:-59.823230806603796,y:205.53752166064345,z:-307.5576380355516},
				'2H外':{x:-53.641733171425045,y:205.53752166064345,z:-468.2387790788809},
				'中心圆广场':{x:-8.558260317649415,y:432.9934112356533,z:-50.52069859181361}
			};
			var LOOKAT_MAP={
				'南广场正中':{x:0,y:100,z:0},
				'7.1H外':{x:444.3323550389266,y:148.84743744943458,z:80.93822481713978},
				'7.1H中':{x:313.60300644690335,y:104.97503877351079,z:90.66115075549132},
				'7.1H内':{x:202.7155998400724,y:104.97503877351079,z:59.655618087733615},
				'8.1H内':{x:203.2682795571165,y:104.97503877351079,z:-91.5433718068101},
				'8.1H中':{x:316.6675219780246,y:104.97503877351079,z:-91.12886201902678},
				'8.1H外':{x:396.4669888668115,y:104.97503877351079,z:-90.83716994614225},
				'1H外':{x:105.92800850638903,y:100.99327725818901,z:-433.1676937183117},
				'1H内':{x:98.59324638703515,y:100.99327725818901,z:-242.50872785346567},
				'2H内':{x:-62.08789465629398,y:100.99327725818901,z:-248.69022548864447},
				'2H外':{x:-55.90639702111523,y:100.99327725818901,z:-409.37136653197376},
				'中心圆广场':{x:-8.528080386051176,y:314.58696245500266,z:-31.02936779253575}
			};
			var DECORATION_MAP={
				'placeholder_flower':null,
				'placeholder_sofa':null,
				'placeholder_router':null
			};
			$(function(){
				$('.guidePoint').on('click',guidePointClicked);
			});
			var SIGNAL_RANGES=[];
			var COLOR_CUBES=[];
			var PREPATE_DONE=false;
			var PAN_SPEED=1;
			var moveForward = false;
			var moveBackward = false;
			var moveLeft = false;
			var moveRight = false;
			
			var moveZup = false;
			var moveZdown=false;
			
			var mouseLeftDown=false;
			var mouseDownVector3=null;
			var mouseMoveVector3=null;
			var mouseDownVector2=null;
			var mouseMoveVector2=null;
			var mouseDownCameraTarget=null;
			var wheelDelta=null;
			
			var onMouseDown=function(event){
				mouseLeftDown=true;
				mouseMoveVector2=mouseDownVector2=new THREE.Vector2(event.clientX,event.clientY);
				//mouseDownVector3=getMouseVector3(event.clientX,event.clientY).negate();
				//mouseDownCameraTarget=camera.getWorldDirection ();
			}
			var onMouseUp=function(event){
				mouseLeftDown=false;
			}
			var onMouseMove=function(event){
				if(mouseLeftDown){
					//mouseMoveVector3=getMouseVector3(event.clientX,event.clientY);
					//mouseMoveVector3=mouseMoveVector3.add(mouseDownVector3);
					mouseMoveVector2=new THREE.Vector2(event.clientX,event.clientY);
				}
				
			}
			var onMouseWheel=function(event){
				wheelDelta=event.wheelDelta*0.01;
			}
			
			
			var onKeyDown = function ( event ) {

					switch ( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = true;
							break;

						case 37: // left
						case 65: // a
							moveLeft = true; break;

						case 40: // down
						case 83: // s
							moveBackward = true;
							break;

						case 39: // right
						case 68: // d
							moveRight = true;
							break;

						case 90: // z
							moveZdown = true;
							break;
						case 88: // x
							moveZup = true;
							break;

					}

				};

				var onKeyUp = function ( event ) {

					switch( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = false;
							break;

						case 37: // left
						case 65: // a
							moveLeft = false;
							break;

						case 40: // down
						case 83: // s
							moveBackward = false;
							break;

						case 39: // right
						case 68: // d
							moveRight = false;
							break;
						case 90: // z
							moveZdown = false;
							break;
						case 88: // x
							moveZup = false;
							break;

					}

				};
			
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			
			var modelObject=null;
			
			var inMoving=false;
			var CURRENT_FLOOR='TOP';
			var lv2Name='ALL_LV2';
			var topName='TOP';
			var movingGroups=[];
			var movingInfo={
				'ALL_LV2':{
					group:null,
					bindingObjs:[],
					originY:0,
					riseY:400,
					targetY:0
				},
				'TOP':{
					group:null,
					bindingObjs:[],
					originY:0,
					riseY:450,
					targetY:0
				}
			}
			
			
			
			var lv2Tag='_tagwall';
			var lv1Tag='_taglv1wall';
			//685.1529765377911,460.0899227711982,911.3142551956929
			var downPos={x:685.1529765377911,y:460.0899227711982,z:911.3142551956929};
			var risePos={x:574.8567551374084,y:246.37720501432494,z:-648.5433196680667};
			
			var FRAME_DELTA=10;
			
			var container, stats, controls=null;
			var camera, scene, renderer, light;
			var sky,sunSphere;
			
			var particleSystem, uniforms, geometry;

			var particles = 6000;
			var particleSize = 30;
			
			var originMaterialMap={};
			

			//var clock = new THREE.Clock();

			var mixers = [];
			
			var lastAnimateTime=null;
			
			var room7wall=null;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );
				
				var pos={x:5.731919877554935,y:3.8872641331944546,z:-14.13968052679183};
				var lookAt={x:-0.37055572384120095,y:0.9179289622670859,z:-8.634268046154205};
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( pos.x,pos.y,pos.z );
				camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
				controls = new THREE.OrbitControls( camera );
				controls.target.set( lookAt.x, lookAt.y, lookAt.z );
				controls.update();

				scene = new THREE.Scene();
				//scene.background = new THREE.Color( 0x000000 );
				//scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
				
				
				
				
				//initCubes();
				
				//ç²å­ææ
				//initParticleSystem();
				
				/////////////////////////////////
				
				light = new THREE.HemisphereLight( 0xffffff, 0x444444,0.7 );
				light.position.set( 0, 200, 0 );
				scene.add( light );

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 200, 100 );
				light.castShadow = true;
				light.shadow.camera.top = 180;
				light.shadow.camera.bottom = -100;
				light.shadow.camera.left = -120;
				light.shadow.camera.right = 120;
				scene.add( light );

				// scene.add( new THREE.CameraHelper( light.shadow.camera ) );

				// ground
				var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				//scene.add( mesh );

				//var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
				//grid.material.opacity = 0.2;
				//grid.material.transparent = true;
				//scene.add( grid );
				
				/*scene.background = new THREE.CubeTextureLoader()
				 .setPath( 'textures/cube/skybox/' )
				 .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );*/

				// model
				var loader = new THREE.FBXLoader();
				loader.load( 'models/fbx/room7_8.fbx', function ( object ) {
					
					modelObject=object;
					object.traverse(function(obj){
						
						if ( obj.isMesh ) {
							//obj.renderOrder=0;
							if(obj.material.length>0){
								var tmp2=[];
								var i=0;
								for(i=0;i<obj.material.length;i++){
									obj.material[i].setValues({side:THREE.DoubleSide});
								}
							}else{
								obj.material.setValues({side:THREE.DoubleSide});
							}
						}
						//console.log(obj.name);
						if(obj.name.indexOf('room7UpMarker')!=-1){
							CLICK_OBJS.push(obj);
						}
						if(obj.name=='room8'){
							obj.visible=false;
						}else if(obj.name=='room7UpLevel1'){
							var opacity=0.3;
							var material=obj.material.clone();
							material.setValues({opacity:opacity,transparent:true});
							obj.material=material;
							room7wall=obj;
							//obj.visible=false;
							/*for(var i=0;i<obj.children.length;i++){
								var child=obj.children[i];
								if ( child.isMesh ) {
									if(child.material.length>0){
										var tmp2=[];
										var i=0;
										for(i=0;i<child.material.length;i++){
											var material=child.material[i].clone();
											material.setValues({opacity:opacity,transparent:true});
											tmp2.push(material);
										}
										child.material=tmp2;
									}else{
										var material=child.material.clone();
										material.setValues({opacity:opacity,transparent:true});
										child.material=material;
									}
								}
							}*/
							
						}else if(obj.name.indexOf('Section')!=-1){
							//obj.material.setValues({opacity:0.8,transparent:true});
							//obj.renderOrder=5;
						}
						
					});
					
					scene.add( object );
					updateKpiCache();
					initEvents();
					//loadDecorations();
				} );

				renderer = new THREE.WebGLRenderer({precision:'highp',antialias:true,powerPreference:'high-performance',depth:true,alpha:true});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				this.renderer.setClearColor(0xececec);//画布颜色
				this.renderer.setClearAlpha(0.0);//画布颜色
				renderer.shadowMap.enabled = true;
				
				
				//renderer.sortObjects = false;

				container.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize, false );

				// stats
				stats = new Stats();
				//container.appendChild( stats.dom );
				
				
				document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keyup', onKeyUp, false );
				
				document.addEventListener( 'mousedown', onMouseDown, false );
				document.addEventListener( 'mouseup', onMouseUp, false );
				document.addEventListener( 'mousemove', onMouseMove, false );
				document.addEventListener( 'mousewheel', onMouseWheel, false );
				
				var context = renderer.domElement.getContext('2d');
				//context.fillStyle = 'rgba(255, 255, 255, 0)';

			}
			function initEvents(){
				//$('.renderKpiSelector').on('click',kpiSelect);
				$('.kpibtn').on('click',kpiSelect2);
			}
			function kpiSelect(e){
				var kpiName=$(e.currentTarget).attr('kpiName');
				var kpiKey=$(e.currentTarget).attr('kpiKey');
				CURRENT_KPI_KEY=kpiKey;
				generateTexture();
			}
			function kpiSelect2(e){
				$('.kpibtn').removeClass('active');
				$(e.currentTarget).addClass('active');
				var kpiName=$(e.currentTarget).attr('kpiName');
				var kpiKey=$(e.currentTarget).attr('kpiKey');
				CURRENT_KPI_KEY=kpiKey;
				generateTexture();
			}
			
			function updateKpiCache() {
				CELL_MAP={};
				for(var i=0;i<CELL_LIST.length;i++){
					var record=CELL_LIST[i];
					CELL_MAP[record[0]]={index:record[1],type:record[2]};
				}
				var cdm=LSMScreen.CacheDataManager.getInstance();
				cdm.getCellKpiTopN({
					hotspot:HOTSPOT,
					sidx:'s_091'
				},function(result){
					KPI_CACHE=result;
					generateTexture();
				});
				
				cdm.getHotspotKpi({
					ids:HOTSPOT
				},function(result){
					var record=result[HOTSPOT];
					$('#s_091').text(record['s_091']);
					$('#s_083').text(record['s_083']);
					$('#hwl').text(record['hwl']);
				});
				
				cdm.getWiFi({},function(result){
					var list=result.data;
					for(var i=0;i<list.length;i++){
						var record=list[i];
						var scene_id=record['scene_id'];
						if(EXP==scene_id){
							$('#building_level').text(record.building_level);
							$('#scene_name').text(record.scene_name);
							$('#wifiusers').text(record.wifiusers);
							$('#wifiups').text(record.wifiups);
							$('#wifidowns').text(record.wifidowns);
							break;
						}
					}
				}.bind(this));
			}
			
			function generateTexture() {
				var list=KPI_CACHE;
				var valueMap={};
				var max=0;
				for(var i=0;i<list.length;i++){
					var record=list[i];
					var name=record.cell_name;
					record.hwl=record.gsmhwl==null?record.ltehwl:record.gsmhwl;
					var kpi=record[CURRENT_KPI_KEY];
					if(!isNaN(kpi)) max=Math.max(max,kpi);
					valueMap[name]=kpi;
				}
				var indexColorMap={};
				//var colors=['#ff5252','#ff933c','#fff066','#00ffaa'];
				//var colors=[[255,82,82],[255,147,60],[255,240,102],[0,255,170]];
				var colors=[[0,255,170],[255,240,102],[255,147,60],[255,82,82]];
				var noneCellMap={};
				var modelCellNameMap={};
				//max
				$('#lv1').text((max/4*3).toFixed(0)+'~'+max);
				$('#lv2').text((max/4*2).toFixed(0)+'~'+(max/4*3).toFixed(0));
				$('#lv3').text((max/4*1).toFixed(0)+'~'+(max/4*2).toFixed(0));
				$('#lv4').text('0~'+(max/4*1).toFixed(0));
				for(var i=0;i<list.length;i++){
					var record=list[i];
					var name=record.cell_name;
					if(CELL_MAP[name]!=null){
						var indexs=CELL_MAP[name].index;
						if(indexs!=null){
							var kpi=record[CURRENT_KPI_KEY];
							var tmp=indexs.split(',');
							for(var j=0;j<tmp.length;j++){
								indexColorMap[tmp[j]]=colors[Math.floor((kpi/max)*(colors.length-1))];
								if(j>0){
									noneCellMap['room7UpMarker'+tmp[j]]=true;
								}else{
									if(record.cell_name==null){
										noneCellMap['room7UpMarker'+tmp[j]]=true;
										modelCellNameMap['room7UpMarker'+tmp[j]]=null;
									}else{
										modelCellNameMap['room7UpMarker'+tmp[j]]=record;
									}
									
								}
							}
						}
					}
				}
				modelObject.traverse(function(obj){
					if(noneCellMap[obj.name]==true){
						obj.visible=false;
					}else if(modelCellNameMap[obj.name]!=null){
						obj.cellname=modelCellNameMap[obj.name].cell_name;
						obj.lacci=modelCellNameMap[obj.name].lacci;
						obj.celltype=modelCellNameMap[obj.name].cell_nt=='gsm'?'2G':'4G';
					}else{
						
					}
				});
				
				var canvas = document.createElement( 'canvas' );
				canvas.width = 2048;
				canvas.height = 2048;
				var context = canvas.getContext('2d');
				var image = context.getImageData( 0, 0, canvas.width, canvas.height );
				//940*170    .66666
				//1108*170   .66666
				var x = 0, y = 0;
				
				var count=0;
				for ( var i = 0, j = 0, l = image.data.length; i < l; i += 4, j ++ ) {

					x = j % canvas.width;
					y = x == 0 ? y + 1 : y;
					
					var sectionIndex=0;
					
					if(x<=940){
						sectionIndex=Math.ceil(y/170);
					}else{
						sectionIndex=24-Math.ceil(y/170)+1;
					}
					if((x<943&&x>937)||y%170<3){
						image.data[ i ] = 255;
						image.data[ i + 1 ] = 255;
						image.data[ i + 2 ] = 255;
						image.data[ i + 3 ] = 255;
					}else{
						var color=indexColorMap[sectionIndex];
						if(color!=null){
							image.data[ i ] = color[0];
							image.data[ i + 1 ] = color[1];
							image.data[ i + 2 ] = color[2];
							image.data[ i + 3 ] = 128;
						}else{
							image.data[ i ] = colors[0][0];
							image.data[ i + 1 ] = colors[0][1];
							image.data[ i + 2 ] = colors[0][2];
							image.data[ i + 3 ] = 128;
						}
					}
					
					
					
				}

				context.putImageData( image, 0, 0 );
				var texture = new THREE.Texture(canvas);
				texture.needsUpdate = true;
				var material = new THREE.MeshPhongMaterial( { map: texture, transparent: true,side:THREE.DoubleSide } );
				modelObject.traverse(function(obj){
					
					if(obj.name=='room7SectionUp'){
						obj.material=material;
					}
					
				});
				
				
			}
			
			/*function generateTexture() {
			
				var canvas = document.createElement( 'canvas' );
				canvas.width = 2048;
				canvas.height = 2048;
				var imgObj = new Image();
				imgObj.src = "images/sectionUV7.jpg";
				imgObj.onload = function(){
					var ctx = canvas.getContext('2d');
					ctx.drawImage(this, 0, 0);//thiså³æ¯imgObj,ä¿æå¾ççåå§å¤§å°ï¼470*480
					//ctx.drawImage(this, 0, 0,1024,768);//æ¹åå¾ççå¤§å°å°1024*768
					var texture = new THREE.Texture(canvas);
					texture.needsUpdate = true;
				
					var material = new THREE.MeshPhongMaterial( { map: texture, transparent: true,side:THREE.DoubleSide } );
					modelObject.traverse(function(obj){
						
						if(obj.name=='room7SectionUp'){
							obj.material=material;
						}
						
					});
				}
			}*/

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				var delta=0;
				if(lastAnimateTime==null){
					lastAnimateTime=new Date();
				}else{
					var now=new Date();
					delta=now.getTime()-lastAnimateTime.getTime();
					delta=delta/(1000/60);
					lastAnimateTime=now;
				}
				//console.log('x:'+camera.position.x+',y:'+camera.position.y+',z:'+camera.position.z);
				if(movingGroups.length>0){
					checkGroupAnimate(movingGroups[movingGroups.length-1],delta);
				}
				
				
				//æåæºå¤ç
				if(controls==null){
					
					var move=delta*PAN_SPEED;
					
					var cameraDir=camera.getWorldDirection ();
					cameraDir.normalize();
					
					var forward=0;
					var backward=0;
					var left=0;
					var right=0;
					
					var up=0;
					var down=0;
					
					
					if(moveForward){
						forward=move;
					}
					if(moveBackward){
						backward=move;
					}
					if(moveLeft){
						left=move;
					}
					if(moveRight){
						right=move;
					}
					if(moveZup){
						up=move;
					}
					if(moveZdown){
						down=move;
					}
					
					
					
					
					if(right-left!=0){
						var dirX=new THREE.Vector3(right-left,0,0);//up-down,backward-forward
						dirX.normalize();
						camera.translateOnAxis(dirX,move);
					}
					if(backward-forward!=0){
						var camDir=camera.getWorldDirection();
						camDir.y=0;
						camDir.normalize();
						camDir.setLength(forward-backward);
						camera.position.add(camDir);
					}
					
					if(down-up!=0){
						var camDir=camera.getWorldDirection();
						camDir.x=0;
						camDir.z=0;
						camDir.normalize();
						camDir.setLength(down-up);
						camera.position.add(camDir);
					}
					
					if(wheelDelta!=0){
						camera.translateOnAxis(new THREE.Vector3(0,0,-1),wheelDelta);
						wheelDelta=0;
					}
					
					if(mouseLeftDown){
						//mouseDownVector3 mouseMoveVector3 mouseDownCameraTarget
						
						
						/*var originTarget=camera.position.clone().add(mouseDownCameraTarget);
						var newTarget=originTarget.clone().add(mouseMoveVector3)
						var angle=newTarget.angleTo(originTarget);
						var upDir=camera.up;
						//camera.lookAt(newTarget);
						camera.rotateOnWorldAxis(upDir,angle);
						console.log('angle:'+angle);*/
						
						var deltaX=mouseMoveVector2.x-mouseDownVector2.x;
						var deltaY=mouseMoveVector2.y-mouseDownVector2.y;
						
						var radX=-deltaX*0.002;
						var radY=-deltaY*0.002;
						camera.rotateOnAxis(new THREE.Vector3(1,0,0),radY);
						camera.rotateOnWorldAxis(new THREE.Vector3(0,1,0),radX);
						
						
						mouseDownVector2.x=mouseMoveVector2.x;
						mouseDownVector2.y=mouseMoveVector2.y;
					}
					
					
				}
				
				
				
				//ç²å­ææéæº
				//animateParticle();
				/////////////////

				renderer.render( scene, camera );

				stats.update();

			}
			function animateParticle(){
				var time = Date.now() * 0.005;

				//particleSystem.rotation.z = 0.01 * time;

				var sizes = geometry.attributes.size.array;

				for ( var i = 0; i < particles; i++ ) {

					sizes[ i ] = particleSize/2 * ( 1 + Math.sin( 0.1 * i + time ) );

				}

				geometry.attributes.size.needsUpdate = true;
			}
			function initCubes(){
				//å¸¦è¾¹æ¡å ä½å¾å½¢
				var cubeSize=10;
				var cubeHeight=cubeSize*3;
				var cubeCount=6400;
				
				var mesh = new THREE.Object3D();
				
				
				mesh.add( new THREE.LineSegments(

					new THREE.Geometry(),

					new THREE.LineBasicMaterial( {
						color: 0xffffff,
						transparent: true,
						opacity: 0
					} )

				) );

				mesh.add( new THREE.Mesh(

					new THREE.Geometry(),

					new THREE.MeshPhongMaterial( {
						color: 0x156289,
						emissive: 0x072534,
						side: THREE.DoubleSide,
						flatShading: true,
						opacity:0,
						transparent:true
					})

				) );
				
				var geometry = new THREE.BoxGeometry( cubeSize, cubeHeight,cubeSize );
				var material = new THREE.MeshBasicMaterial( {
					color: 0x00ff00,
					opacity:0,
					transparent:true
				} );
				var cube = new THREE.Mesh( geometry, material );
				
				
				mesh.children[ 0 ].geometry.dispose();
				mesh.children[ 1 ].geometry.dispose();

				mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
				mesh.children[ 1 ].geometry = geometry;
				//mesh.position.set(0,cubeSize/2,0);
				
				var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeHeight,cubeSize);
				var cubeMaterial = new THREE.MeshBasicMaterial({
					wireframe : true,
					transparent:true,
					opacity:0.1
				});
				cubeMaterial.color = new THREE.Color('white');
				var wireCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
				
				
				var cubeMaterial2 = new THREE.MeshBasicMaterial({
					wireframe : false,
					transparent:true,
					opacity:0.5
				});
				cubeMaterial2.color = new THREE.Color('blue');
				var colorCube2 = new THREE.Mesh(cubeGeometry, cubeMaterial2);
				
				var startX=-cubeSize*Math.sqrt(cubeCount)/2;
				var startZ=-cubeSize*Math.sqrt(cubeCount)/2;
				var cubeY=cubeHeight/2;
				
				var currentX=startX;
				var currentZ=startZ;
				var col=0;
				var row=0;
				
				var colors=[0x1281ff,0x7ebaff,0xffa0f3,0xff5dea];
				
				for(var i=0;i<cubeCount;i++){
					
					
					if(//ä¸éè¦çæ¹å
						currentX<-400
						||(currentX<=-156&&(currentZ<=-156||currentZ>=147))
						||(currentX>=156&&(currentZ<=-156||currentZ>=147))
						||(currentX>=-110&&currentX<=110&&currentZ>-116&&currentZ<117)
						||(currentX==currentZ)
						||(currentX==currentZ+1*cubeSize)
						||(currentX==currentZ-1*cubeSize)
						||(currentX==-currentZ)
						||(currentX==-currentZ+1*cubeSize)
						||(currentX==-currentZ-1*cubeSize)
						
						||(currentX==-1*cubeSize)
						||(currentX==0)
						||(currentX==1*cubeSize)
						||(currentZ==-1*cubeSize)
						||(currentZ==0)
						||(currentZ==1*cubeSize)
					){}else{
						var random=Math.random();
						var c=wireCube.clone();
						c.position.set(currentX,5+cubeHeight/2,currentZ);
						scene.add( c );
						
						//var color=new THREE.Color(0.5-0.5*random,0.5-0.5*random,1);
						var color1=colors[Math.round((colors.length-1)*Math.random())];
						var color2=colors[Math.round((colors.length-1)*Math.random())];
						var c2=colorCube2.clone();
						var m=c2.material.clone();
						m.setValues({color:color1,opacity:0.5});
						c2.material=m;
						c2.scale.set(1,0.5,1);
						c2.position.set(currentX,5+cubeHeight/2,currentZ);
						scene.add( c2 );
						
						var c3=colorCube2.clone();
						var m=c3.material.clone();
						m.setValues({color:color2,opacity:0.5});
						c3.material=m;
						c3.scale.set(1,0.5,1);
						c3.position.set(currentX,5+cubeHeight,currentZ);
						scene.add( c3 );
						
						COLOR_CUBES.push(c);
						COLOR_CUBES.push(c2);
						COLOR_CUBES.push(c3);
						
						
					    //var colorCube=cube.clone();
						//var scale=1;
						//colorCube.position.set(currentX,cubeY,currentZ);
						//scene.add( colorCube );
						//colorCube.scale.set(scale,scale,scale);
						//colorCube.renderOrder=5;
						//COLOR_CUBES.push(colorCube);
					}
					
					currentX+=cubeSize;
					col++;
					if(col>=Math.sqrt(cubeCount)){
						row++;
						col=0;
						currentX=startX;
						currentZ+=cubeSize;
					}
				}
				
				
			}
			function initParticleSystem(){
				uniforms = {

					texture:   { value: new THREE.TextureLoader().load( "textures/sprites/spark1.png" ) }

				};

				var shaderMaterial = new THREE.ShaderMaterial( {

					uniforms:       uniforms,
					vertexShader:   document.getElementById( 'vertexshader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					
					blending:       THREE.AdditiveBlending,
					depthTest:      false,
					transparent:    true,
					vertexColors:   true

				});


				var radius = 470;
				
				geometry = new THREE.BufferGeometry();
				//var baseX=-81.62353515625;//-81.62353515625,125.88363647460938,-20.49648666381836
				//var baseY=60;
				//var baseZ=165.88363647460938;
				
				var baseX=0;//-81.62353515625,125.88363647460938,-20.49648666381836
				var baseY=5;
				var baseZ=0;
				
				var positions = [];
				var colors = [];
				var sizes = [];

				var color = new THREE.Color();
				
				for ( var i = 0; i < particles/3*2; i ++ ) {

					//positions.push( baseX+( Math.random() * 2 - 1 ) * radius );
					//positions.push( baseY );
					//positions.push( baseZ+( Math.random() * 2 - 1 ) * radius );
					var angle=Math.random()*Math.PI*2;
					var randomR=radius*Math.random();
					positions.push( baseX+( Math.cos(angle) ) * randomR );
					positions.push( baseY );
					positions.push( baseZ+( Math.sin(angle)) * randomR );

					color.setHSL( 1.0, 1.0, 1.0 );

					//colors.push( color.r, color.g, color.b );
					colors.push( 0, 255, 0 );
					sizes.push(particleSize);

				}
				baseX=-221.62353515625;
				baseY=10;
				baseZ=225.88363647460938;
				radius=100;
				
				detailRandom(baseX,baseY,baseZ,particles/3,radius,positions,colors,sizes);
				
				geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
				geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
				geometry.addAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setDynamic( true ) );
				//alert(sizes.length);
				particleSystem = new THREE.Points( geometry, shaderMaterial );
				particleSystem.renderOrder=5;
				particleSystem.visible=false;
				scene.add( particleSystem );
			}
			function detailRandom(baseX,baseY,baseZ,count,radius,positions,colors,sizes){
				var color = new THREE.Color();
				var splitCount=Math.ceil(count*(0.2+Math.random()*0.2));
				var leftCount=count-splitCount;
				var splitRadius=radius*(0.3+0.5*Math.random());
				var splitAngle=Math.random()*Math.PI*2;
				var splitX=baseX+( Math.cos(splitAngle) ) * radius;
				var splitY=baseY+( Math.sin(splitAngle) ) * radius;
				if(leftCount<100){
					splitCount=count;
				}else{
					detailRandom(baseX,baseY,baseZ,leftCount,radius,positions,colors,sizes)
				}
				
				for ( var i = 0; i < splitCount; i ++ ) {
					var angle=Math.random()*Math.PI*2;
					var randomR=splitRadius*Math.random();
					positions.push( splitX+( Math.cos(angle) ) * randomR );
					positions.push( baseY );
					positions.push( splitY+( Math.sin(angle)) * randomR );

					color.setHSL( 1.0, 1.0, 1.0 );
					colors.push( 0, 255, 0 );
					sizes.push(particleSize);
				}
			}
			function checkGroupAnimate(groupName,delta){
				var group=movingInfo[groupName].group;
				var targetY=movingInfo[groupName].targetY;
			
				var yMove=delta*FRAME_DELTA;
				if(group!=null){
					var y=group.position.y;
					var actualMove=0;
					if(y-targetY>yMove){//going down
						group.position.y-=yMove;
						actualMove=-yMove;
						controlLv2Opacity(groupName);
					}else if(y-targetY<-yMove){//going rise
						group.position.y+=yMove;
						actualMove=yMove;
						controlLv2Opacity(groupName);
					}else if(Math.abs(y-targetY)<yMove){
						actualMove=targetY-group.position.y;
						group.position.y=targetY;
						if(inMoving){
							controlLv2Opacity(groupName);
							movingGroups.pop();
							
							if(movingGroups.length==0){
								lv2MoveEnd();
							}
						}
					}
					if(actualMove!=0){
						for(var i=0;i<movingInfo[groupName].bindingObjs.length;i++){
							movingInfo[groupName].bindingObjs[i].position.y+=actualMove;
						}
					}
					
				}
				
				
			}
			function showFloor(floor){
				if(!PREPATE_DONE){
					alert('Preparing');
					return;
				}
				if(inMoving==false){
					if(floor=='TOP'){
						movingInfo[lv2Name].targetY=movingInfo[lv2Name].originY;
						movingInfo[topName].targetY=movingInfo[topName].originY;
						movingGroups=[topName,lv2Name];
					}else if(floor=='1F'){
						movingInfo[lv2Name].targetY=movingInfo[lv2Name].riseY;
						movingInfo[topName].targetY=movingInfo[topName].riseY;
						movingGroups=[lv2Name,topName];
					}else if(floor=='2F'){
						movingInfo[lv2Name].targetY=movingInfo[lv2Name].originY;
						movingInfo[topName].targetY=movingInfo[topName].riseY;
						movingGroups=[lv2Name,topName];
					}
					CURRENT_FLOOR=floor;
					inMoving=true;
				}
			}
			
			
			
			function lv2MoveEnd(){
				inMoving=false;
				if(CURRENT_FLOOR=='2F'){
					highLightTag(lv2Tag);
					//camera.position.set( downPos.x,downPos.y,downPos.z );
					//camera.lookAt(0,100,0);
				}else if(CURRENT_FLOOR=='1F'){
					highLightTag(lv1Tag);
					//camera.position.set( risePos.x,risePos.y,risePos.z );
					//camera.lookAt(0,100,0);
				}else if(CURRENT_FLOOR=='TOP'){
					highLightTag();
					//camera.position.set( downPos.x,downPos.y,downPos.z );
					//camera.lookAt(0,100,0);
				}
			}
			function controlLv2Opacity(groupName){
				var group=movingInfo[groupName].group;
				var y=group.position.y;
				var origin=movingInfo[groupName].originY;
				var rise=movingInfo[groupName].riseY;
				var opacity=1-Math.abs(y-origin)/(rise-origin);
				group.traverse(changeChildOpacity);
				for(var i=0;i<movingInfo[groupName].bindingObjs.length;i++){
					movingInfo[groupName].bindingObjs[i].traverse(changeChildOpacity);
				}
				function changeChildOpacity(child){
					if ( child.isMesh ) {
						if(child.material.length>0){
							var tmp2=[];
							var i=0;
							for(i=0;i<child.material.length;i++){
								var material=child.material[i].clone();
								material.setValues({opacity:opacity,transparent:true});
								tmp2.push(material);
							}
							child.material=tmp2;
						}else{
							var material=child.material.clone();
							material.setValues({opacity:opacity,transparent:true});
							child.material=material;
						}
					}
				}
			}
			
			function highLightRandom(){
				modelObject.traverse( function ( child ) {

						if ( child.isMesh ) {
							if(child.name.indexOf('COLOR_BOX')!=-1){
								var random=Math.random();
								if(random>0.7){
								 return;
								}
								if(child.material.length>0){
									var tmp=[];
									var tmp2=[];
									var i=0;
									for(i=0;i<child.material.length;i++){
										tmp.push(child.material[i].clone());
									}
									if(originMaterialMap[child.name]==null){
										originMaterialMap[child.name]=tmp;
									}
									for(i=0;i<child.material.length;i++){
										var material=child.material[i].clone();
										material.setValues({color:0xff0000,opacity:0.7,transparent:true});
										tmp2.push(material);
									}
									child.material=tmp2;
								}else{
									if(originMaterialMap[child.name]==null){
										originMaterialMap[child.name]=child.material.clone();
									}
									var material=child.material.clone();
									material.setValues({color:0xff0000,opacity:0.7,transparent:true});//emissive:0xffb200,emissiveIntensity:0.8 //0xffb200
									child.material=material;
								}
								
							}else{}
						}

					} );
			}
			
			function guidePointClicked(e){
				var tip=$(e.currentTarget).attr('title');
				//alert(tip);
				var cameraPos=CAMERA_MAP[tip];
				var lookAtPos=LOOKAT_MAP[tip];
				camera.position.set( cameraPos.x,cameraPos.y,cameraPos.z );
				camera.lookAt(lookAtPos.x,lookAtPos.y,lookAtPos.z);
				
				if(controls!=null){
					controls.target.set( lookAtPos.x,lookAtPos.y,lookAtPos.z );
					controls.update();
				}
			}
			
			function orbitCtrl(){
				if(controls==null){
					controls = new THREE.OrbitControls( camera );
					controls.target.set( 0, 0, 0 );
					controls.update();
				}
			}
			
			function freeCamera(){
				if(controls!=null){
					controls.dispose();
					controls=null;
				}
			}
			function showPeople(){
				if(particleSystem!=null){
					particleSystem.visible=!particleSystem.visible;
					if(particleSystem.visible==true){
						transparentAll(0.3);
					}else{
						transparentAll(1);
					}
				}
			}
			function showCover(floor){
				/*for(var i=0;i<SIGNAL_RANGES.length;i++){
					SIGNAL_RANGES[i].visible=!SIGNAL_RANGES[i].visible;
				}*/
				if(COLOR_CUBES.length==0){
					initCubes();
				}else{
					if(floor=='1F'){
						for(var i=0;i<COLOR_CUBES.length;i++){
							COLOR_CUBES[i].visible=i%3==0||i%3==1;
						}
					}else if(floor=='2F'){
						for(var i=0;i<COLOR_CUBES.length;i++){
							COLOR_CUBES[i].visible=i%3==0||i%3==2;
						}
					}else{
						var originVisible=false;
						for(var i=0;i<COLOR_CUBES.length;i++){
							if(COLOR_CUBES[i].visible){
								originVisible=true;
								break;
							}
						}
						for(var i=0;i<COLOR_CUBES.length;i++){
							COLOR_CUBES[i].visible=!originVisible;
						}
					}
					
				}
				
			}
			function showHeatMap(){
				var time1=Date.now();
				var positions=geometry.attributes.position.array;
				var colors=geometry.attributes.color.array;
				//255,0,0
				//255,150,0
				//0,255,0
				var redThreshold=50;
				var testCount0=0;
				var testCount1=0;
				
				for ( var i = 0; i < particles; i++ ) {
					var x=positions[i*3];
					var z=positions[i*3+2];
					var v2=new THREE.Vector2(x,z);
					var count=surroundCount(v2,25);//countè³å°æ¯1
					if(count>redThreshold){
						//continue;
						colors[i*3]=1;
						colors[i*3+1]=0;
						colors[i*3+2]=0;
						testCount0++;
					}else{
						var percent=count/redThreshold;
						var partPercent=1;
						//console.log(percent);
						if(percent>0.5){
							partPercent=(percent-0.5)/0.5;
							colors[i*3]=1;
							colors[i*3+1]=150*(1-partPercent)/255;
							colors[i*3+2]=0;
							testCount0++;
						}else{
							
							partPercent=(0.5-percent)/0.5;
							colors[i*3]=(255*(1-partPercent))/255;
							colors[i*3+1]=150+(255-150)*partPercent/255;
							colors[i*3+2]=0;
							//console.log(colors[i*3]+','+colors[i*3+1]+','+colors[i*3+2]);
							testCount1++;
						}
					}
					//console.log(count);
				}
				geometry.attributes.color.needsUpdate = true;
				var time2=Date.now();
			}
			
			function transparentAll(opacity){
				modelObject.traverse(changeChildOpacity);
				function changeChildOpacity(child){
					if ( child.isMesh ) {
						if(child.material.length>0){
							var tmp2=[];
							var i=0;
							for(i=0;i<child.material.length;i++){
								var material=child.material[i].clone();
								if(material.opacity!=0){
									material.setValues({opacity:opacity,transparent:true});
								}
								tmp2.push(material);
							}
							child.material=tmp2;
						}else{
							var material=child.material.clone();
							if(material.opacity!=0){
								material.setValues({opacity:opacity,transparent:true});
							}
							child.material=material;
						}
					}
				}
			}
			function surroundCount(targetV2,radius){
				var positions=geometry.attributes.position.array;
				var count=0;
				for ( var i = 0; i < particles; i++ ) {
					var x=positions[i*3];
					var z=positions[i*3+2];
					var v2=new THREE.Vector2(x,z);
					var distance=targetV2.distanceTo(v2);
					if(distance<radius){
						count++;
					}
				}
				return count;
			}
			function getMouseVector3(clientX,clientY){
				var mv = new THREE.Vector3(
					(clientX / window.innerWidth) * 2 - 1,
					-(clientY / window.innerHeight) * 2 + 1,
					0.5 );
				mv.unproject(this.camera);   //è¿å¥å°ä¸ä¸ªåéè½¬æthreejsåæ 
				return mv;
			}
			
			
			function loadDecorations(){
				var loader = new THREE.FBXLoader();
				//DECORATION_MAP['placeholder_flower']
				loader.load( 'models/fbx/flower_simple.FBX', function ( object ) {
					var scale=0.01;
					object.scale.set(scale,scale,scale);
					DECORATION_MAP['placeholder_flower']=object;
					initSceneInfo();
				} );
				var loader2 = new THREE.FBXLoader();
				//DECORATION_MAP['placeholder_sofa']
				loader2.load( 'models/fbx/sofa_simple.FBX', function ( object ) {
					var scale=0.5;
					object.scale.set(scale,scale,scale);
					DECORATION_MAP['placeholder_sofa']=object;
					initSceneInfo();
				} );
				var loader3 = new THREE.FBXLoader();
				//DECORATION_MAP['placeholder_router']
				loader3.load( 'models/fbx/router_simple.FBX', function ( object ) {
					DECORATION_MAP['placeholder_router']=object;
					initSceneInfo();
				} );
				
			}
			
			function initSceneInfo(){
				for(var key in DECORATION_MAP){///è£é¥°åæªå è½½å®æ
					if(DECORATION_MAP[key]==null){
						return;
					}
				}
				var key=0;
				modelObject.traverse( function ( child ) {
					var object=null;
					//console.log(child.name);
					var localPosAdjust=new THREE.Vector3(0,0,0);
					if(child.name=='grond'){
						child.visible=false;
						
					}else if(child.name=='ALL_LV1'){
						child.scale.set(1,1,0.01);
						child.position.set(0,5,0);
					}else if(child.name.indexOf('placeholder_flower')!=-1){
						object=DECORATION_MAP['placeholder_flower'];
					}else if(child.name.indexOf('placeholder_sofa')!=-1){
						object=DECORATION_MAP['placeholder_sofa'];
						localPosAdjust=new THREE.Vector3(0,0,5);
					}else if(child.name.indexOf('placeholder_router')!=-1){
						//localPosAdjust=new THREE.Vector3(0,10,0);
						object=DECORATION_MAP['placeholder_router'];
						
					}
					if ( object!=null ) {
						var obj=object.clone();
						var worldPos=child.localToWorld(localPosAdjust);
						
						
						if(false&&child.name.indexOf('placeholder_router')!=-1){
						
							//ä¿¡å·è¦ç
							var geometry = new THREE.SphereGeometry( 120, 32, 32 );
							var material = new THREE.MeshBasicMaterial( {color: 0x00ff00,opacity:0.3,transparent:true} );
							var sphere = new THREE.Mesh( geometry, material );
							sphere.position.set(worldPos.x,worldPos.y,worldPos.z);
							sphere.renderOrder=5;
							sphere.visible=false;
							//sphere.userData.positionholder=child;
							SIGNAL_RANGES.push(sphere);
							setTimeout(bindMoveObjs.bind(sphere),0);
							scene.add( sphere );
							/////////////////////////////////
						}
						
						obj.position.set(worldPos.x,worldPos.y,worldPos.z);
						obj.userData.positionholder=child;
						scene.add( obj );
						
						setTimeout(bindMoveObjs.bind(obj),0);
						/*var parent=child.parent;
						while(movingInfo[parent.name]==null){
							parent=parent.parent;
						}
						movingInfo[parent.name].bindingObjs.push(obj);*/
					}
					if ( child.type=='Group' ) {
						if(movingInfo[child.name]!=null){
							movingInfo[child.name].group=child;
							movingInfo[child.name].originY=movingInfo[child.name].targetY=child.position.y;
						}	
					}else if ( child.isMesh ) {
						
						child.castShadow = true;
						child.receiveShadow = true;
					}
					clearTimeout(key);
					key=setTimeout(allDone,500);
				});
			}
			
			function bindMoveObjs(){
				var obj=this;
				var child=this.userData.positionholder;
				var parent=child.parent;
				while(movingInfo[parent.name]==null){
					if(parent.parent==null) break;
					parent=parent.parent;
				}
				if(movingInfo[parent.name]) movingInfo[parent.name].bindingObjs.push(obj);
			}
			
			function allDone(){
				console.log('=====================allDone');
				PREPATE_DONE=true;
			}
			
			var raycaster=new THREE.Raycaster();
			$(window).on('click', onMouseClick);
			function onMouseClick(event){
				if($('#modalWin').is(':visible')){
					return;
				}
				
				var x = ( event.clientX / window.innerWidth ) * 2 - 1;
				var y = - ( event.clientY / window.innerHeight ) * 2 + 1;
				
				var vec=new THREE.Vector2(x,y);
				if(modelObject){
					this.raycaster.setFromCamera( vec, camera );
					// calculate objects intersecting the picking ray
					var i = 0;
					var intersects = raycaster.intersectObjects( CLICK_OBJS );
					for ( i = 0; i < intersects.length; i++ ) {
						var obj=intersects[i].object;
						var tmp=BASEPATH.split('/');
	                    var urlBase=tmp[0]+'//'+tmp[2]+'/sh/shUltimate/';
	                    var url='';
	                    var hotspot=HOTSPOT;
	                    var hotId=HOTSPOT;
	                    var name=obj.cellname;
	                    var lacci=obj.lacci;
	                    var type=obj.celltype;
	                   
	                    if(type=='2G'){
	                    	url=urlBase+"pagesDSN/sitePieChartsBig23G.html?lacci="+lacci+"&hotspot="+encodeURIComponent(hotspot) + "&name=" + encodeURIComponent(name)+ "&hotid=" + encodeURIComponent(hotId) + "&end=" + '&type=' + encodeURIComponent(type) + "&endType=";
	                    }else{
	                    	url=urlBase+"pagesDSN/sitePieChartsBig.html?lacci="+lacci+"&hotspot="+encodeURIComponent(hotspot) + "&name=" + encodeURIComponent(name)+ "&hotid=" + encodeURIComponent(hotId) + "&end=" + '&type=' + encodeURIComponent(type) + "&endType=";
	                    }
						$('#kpiFrame').attr('src','');
						$('#modalWin').modal();
						$('#kpiFrame').attr('src',url);
						break;
					}
					
					
					/*var hotspot=HOTSPOT;
                    var heatPopup4G = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
                        .setLatLng([lat,lng]);
                    heatPopup4G.setContent('<iframe width="680px" ondblclick="alert();" frameborder=no height="460px" src='+urlBase+"pagesDSN/sitePieChartsBig.html?lacci="+lacci+"&hotspot="+encodeURIComponent(hotspot) + "&name=" + encodeURIComponent(name)+ "&hotid=" + encodeURIComponent(hotId) + "&end=" + '&type=' + encodeURIComponent(type) + "&endType=" + '></iframe>');
                    var heatPopup3G = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
                        .setLatLng([lat,lng]);
                    heatPopup3G.setContent('<iframe width="680px" ondblclick="alert();" frameborder=no height="460px" src='+urlBase+"pagesDSN/sitePieChartsBig23G.html?lacci="+lacci+"&hotspot="+encodeURIComponent(hotspot) + "&name=" + encodeURIComponent(name)+ "&hotid=" + encodeURIComponent(hotId) + "&end=" + '&type=' + encodeURIComponent(type) + "&endType=" + '></iframe>');
                    
                    var heatPopup2G = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
                        .setLatLng([lat,lng]);
                    heatPopup2G.setContent('<iframe width="680px" ondblclick="alert();" frameborder=no height="460px" src='+urlBase+"pagesDSN/sitePieChartsBig23G.html?lacci="+lacci+"&hotspot="+encodeURIComponent(hotspot) + "&name=" + encodeURIComponent(name)+ "&hotid=" + encodeURIComponent(hotId) + "&end=" + '&type=' + encodeURIComponent(type) + "&endType=" + '></iframe>');*/
                    
				}
			}
			
			function cellKpiCtrl(){
				var mark=$('#triMark').text();
				if(mark=='▾'){
					$('#triMark').text('▴');
					$('#legend').height(420);
					room7wall.visible=false;
				}else{
					$('#triMark').text('▾');
					$('#legend').height(72);
					room7wall.visible=true;
				}
			}

		</script>

	</body>
</html>
