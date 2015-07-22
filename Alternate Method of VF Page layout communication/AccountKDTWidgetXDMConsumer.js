(function() {
 
        //define a map of SF pod instance names to the organization Id pod byte (orgid[3])
        window.__podMap={0:"NA0",3:"na1",5:"na3",6:"na4",7:"na5",8:"na6",A:"na7",C:"na8",E:"na9",F:"na10",G:"na11",U:"na12",d:"na14",1:"ap0",9:"ap1",2:"eu0",D:"eu1",b:"eu2",T:"cs0",S:"cs1",R:"cs2",Q:"cs3",P:"cs4",O:"cs5",N:"cs6",M:"cs7",L:"cs8",K:"cs9",J:"cs10",Z:"cs11",V:"cs12",W:"cs13",c:"cs14",e:"cs15",f:"cs16",g:"cs17",t:"na1"};
 
        //set the id of the ApexPage XDMPage
        window.__vfPageId = "066170000004eZn";
		
        //get the URL of the VF page as embedded in the iframe
        var hostParts = location.hostname.split(/\./);
		console.log( hostParts );
		console.log( 'the length of hostparts is' + hostParts.length );
        if (hostParts.length === 3) {
			console.log('met first condition');
            //2nd parm is the id of the OpptyProducts VF page in the org
            window.__vfFrameURL = "https://c."+ hostParts[0]+".visual.force.com/servlet/servlet.Integration?lid="+__vfPageId+"&ic=1";
        } else if (hostParts.length === 4 && hostParts[1] === "my") {
			console.log('met 2nd condition');
            var userInfo = sforce.connection.getUserInfo();
            var pod = userInfo.organizationId[3];
            if (typeof __podMap[pod] === "string") {
                window.__vfFrameURL = "https://c."+__podMap[pod]+".visual.force.com/servlet/servlet.Integration?lid="+__vfPageId+"&ic=1";
            }
        } else if (hostParts.length === 5 ) {
			console.log( "https://" + hostParts[0] + "--c." + hostParts[1] + ".visual.force.com/servlet/servlet.Integration?lid="+__vfPageId+"&ic=1" );
			window.__vfFrameURL = "https://" + hostParts[1] + "--c." + hostParts[2] + ".visual.force.com/servlet/servlet.Integration?lid="+__vfPageId+"&ic=1";
		}
 
        console.log( typeof window.__vfFrameURL );
		console.log( typeof window.__vfPageId );
		if (typeof window.__vfFrameURL === "string" && typeof window.__vfPageId === "string" ) {
		
            //set up the parent side of the message pipeline, including event listener and message handler
            __ConsumerXDM = new Porthole.WindowProxy(window.__vfFrameURL, window.__vfPageId);
            __ConsumerXDM.addEventListener(function (message) {
                if (message) {
                    var msg = message.data;
                    switch (msg.verb) {
                        case "test":
                            console.warn("XDM Test message recv'd");
                            break;
                        case "refresh":
                            location.reload();
                            break;
                        case "edit":
                            location.href = location.href + "/e?retURL=%2F" + location.pathname;
                            break;
                        case "resize":
							console.log( "resizing" );
                            if (msg.payload && msg.payload.size && msg.payload.iframe) {
                                if (typeof Ext === "object") {
									console.log( "iframe[title='" + msg.payload.iframe + "']" );
                                    var nodes = Ext.query("iframe[title='" + msg.payload.iframe + "']");
                                    if (!Ext.isEmpty(nodes)) {
                                        var i = Ext.fly(nodes[0].id);
                                        i.setHeight(msg.payload.size.height * 1);
                                    }
                                }
                            }
							break;
						case "redirectToObj":
							if ( msg.payload && msg.payload.ObjID){
								location.href = '/' + msg.payload.ObjID;
							}
							break;
                    }
                }
 
            });
        }
})();