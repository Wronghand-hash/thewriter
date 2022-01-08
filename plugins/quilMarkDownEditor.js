import Vue from 'vue'

import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import MarkdownShortcuts from 'quill-markdown-shortcuts-for-vue-quill-editor'
Quill.register('modules/markdownShortcuts', MarkdownShortcuts)

Vue.use(VueQuillEditor)