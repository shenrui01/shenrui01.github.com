/**
 * Copyright © Jordan Lee, Dave Perrett, Malcolm Jarvis and Bruno Bierbaumer
 *@Rui Shen shenrui01@gmail.com
 * This file is licensed under the GPLv2.
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */
 
var Notifications = {};

$(document).ready(function () {
  if (!window.webkitNotifications) {
    return;
  }

  var notificationsEnabled = (window.webkitNotifications.checkPermission() === 0),
      toggle = $('#toggle_notifications');

  toggle.show();
  updateMenuTitle();
  $(transmission).bind('downloadComplete seedingComplete', function (event, torrent) {
  	if (notificationsEnabled) {
		var title = (event.type == 'downloadComplete' ? 'Download' : 'Seeding') + ' complete',
			content = torrent.getName(),
			notification;
	
		notification = window.webkitNotifications.createNotification('style/transmission/images/logo.png', title, content);
		notification.show(); 
		setTimeout(function () {
		  notification.cancel();
		}, 5000);
	};
  });

  function updateMenuTitle() {
    toggle.html((notificationsEnabled ? '禁用' : '启用') + ' 通知');
  }

  Notifications.toggle = function () {
    if (window.webkitNotifications.checkPermission() !== 0) {
      window.webkitNotifications.requestPermission(function () {
        notificationsEnabled = (window.webkitNotifications.checkPermission() === 0);
        updateMenuTitle();
      });
    } else {
      notificationsEnabled = !notificationsEnabled;
      updateMenuTitle();
    }
  };
});