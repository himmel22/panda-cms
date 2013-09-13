/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.language = 'zh-cn';



	config.toolbarGroups = [
		{ name: 'insert' },
		{ name: 'links' },
		{ name: 'document',    groups: [ 'mode', '-', '-' ] },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'about' },
		'/',
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] }
		
	];
};
