## Grunt-generator

�򵥵�ǰ����Ŀ�����������ã�**�Զ�����**�ļ�Ŀ¼�ṹ��ʹ��**ѹ��**��**ά��**��**����**ʱ�ǳ����㣬��web������Ѹ�١��򵥡�

 - ���ԣ�grunt-livereload + Chrome Plug-in ��Firefox-LiveReload-2.0.8.xpi��
 - ����Ŀ¼��nodejs
 - ά������Ŀ�ļ�Ŀ¼����package.json�б༭

----------

### ��װ

    php + node���� + grunt

### ���� package.json

 1. _css����ǰϵͳ������������css�ļ����ƣ�����Ҫд.css�����������·��
 2. _js����ǰϵͳ������������js�ļ����ƣ�����Ҫд.js�����������·��
 3. _src��Դ�ļ�Ŀ¼������Ҫ�޸�
 4. _dest��Ŀ���ļ�Ŀ¼������Ҫ�޸�

### ʹ�ã����ؿ�����

1. �ն��е���ǰĿ¼��ִ������ `node node/build.js` ��Ŀ¼`src��dest`������Ŀ¼���Զ�����
2. ��php�ļ������� `<?php include "dest/html/assets.html";?>`
3. ����ok�ˣ�������Կ���ִ������ `grunt blive`������chrome��FF�а�װLiveReload�����

### ʹ�ã��������ߣ�

��ʼѹ���ļ����������е���Ŀ¼��ִ������ `grunt` �󣬽���dest/css��dest/jsĿ¼���Զ�����main.min.js��main.min.css�ļ����ļ������ɹ������뵽 xxx.html 

    <script type="text/javascript" src="dest/js/main.min.js"></script>



�ļ�Ŀ¼�ṹ���£�

    .
    ������ src ���Դ�ļ�
    ��   ������ css
    ��   ������ js
    ��   ������ html
    ������ dest Ŀ���ļ������ϲ���ѹ������ļ�������html�ļ�ֱ������
    ��   ������ css
    ��   ������ js
    ��   ������ html
    ������ node
    ��   ������ dir.js
    ��   ������ fs2.js
    ��   ������ build.js ����js��css��ԴĿ¼��Ŀ��Ŀ¼
    ������ node_modules �Զ����ɵ�
    ������ Gruntfile.js grunt�����ļ�������grunt�ϲ���ѹ���ȹ���
    ������ package.json ����д���˵�ǰϵͳ�����õ�������js��css��gruntģ�����Ϣ