/*
	TXT by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var signedUp = "false";

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				speed: 300,
				alignment: 'center'
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});

})(jQuery);


    function openNav() {
        document.getElementById("myNav").style.height = "100%";
    }

    function closeNav() {
        document.getElementById("myNav").style.height = "0%";
    }


    function accountSubmit(){
        window.alert("Thank you! \n As a reminder that information was not stored in any manner\n and an account was not created\nNor logged in :)");
        if(signedUp =="true")
		{
			var fName = document.getElementById("sFirstName").value;
			var lName = document.getElementById("sLastName").value;
			var email = document.getElementById("sEmail").value;
			//Set cookies to expire after about  minutes
			setCookie("firstname", fName, 5);
			setCookie("lastname", lName, 5);
			setCookie("eAddress", email, 5);
			//Send user to the Edit profile page
        	window.location.href ="../Profile/newProfile.html";
        }
        closeNav();
    }
	
    function hideLogin() {
		signedUp="true";
        document.getElementById("login").style.visibility="hidden";
        document.getElementById("signup").style.visibility="visible";
    }
	
    function showLogin() {
		signedUp="false";
        document.getElementById("login").style.visibility="visible";
        document.getElementById("signup").style.visibility="hidden";
		checkCookie();
    }
	
    function setCookie(cname, cvalue, minutes) {
        var d = new Date();
        d.setTime(d.getTime() + (minutes*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=../Profile/newProfile.html";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }
	
    function checkCookie() {
        var user = getCookie("firstname");
        var luser= getCookie("lastname");
        var euser= getCookie("eAddress");
		//window.alert(user+" "+luser+" "+euser);
        if (user != "") {
			document.getElementById("newProfile_id_first_name").value=user;
			document.getElementById("newProfile_id_last_name").value=luser;
			document.getElementById("newProfile_email").value=euser;	
		}
    }
	
	function addRow(tableID) {
	
	var table = document.getElementById(tableID);
	
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	
	var cell1 = row.insertCell(0);
	var element1 = document.createElement("input");
	element1.type = "checkbox";
	element1.name="chkbox[]";
	cell1.appendChild(element1);
	
	var cell2 = row.insertCell(1);
	var element2 = document.createElement("input");
	element2.type = "text";
	cell2.innerHTML = "[Please Enter Volunteer Name]";

	cell2.contentEditable=true;
	
	var cell3 = row.insertCell(2);
	var element3 = document.createElement("input");
	cell3.innerHTML = "[please Enter Phone Number]";
	cell3.contentEditable=true;
	
	var cell4 = row.insertCell(3);
	var element4 = document.createElement("input");
	element4.type = "checkbox";
	element4.name="chkbox[]";
	cell4.appendChild(element4);
	
	var cell5 = row.insertCell(4);
	var element5 = document.createElement("input");
	cell5.innerHTML = "0";
	cell5.contentEditable=true;
	}

	function deleteRow(tableID) {
		try {
			var table = document.getElementById(tableID);
			var rowCount = table.rows.length;

			for(var i=0; i<rowCount; i++) {
				var row = table.rows[i];
				var chkbox = row.cells[0].childNodes[0];
				if(null != chkbox && true == chkbox.checked) {
					table.deleteRow(i);
					rowCount--;
					i--;
				}


			}
		}
		catch(e) {
			alert(e);
		}
	}