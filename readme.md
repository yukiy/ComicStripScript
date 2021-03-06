
ComicStripScript
---

ComicStripScript is a javascript-based language you can write a code with emoticons and speech bubbles.

<div>
	<p><strong>Define the title</strong></p>

	<pre><code>
	---TITLE
	<i>title_you_define</i>
	</code></pre>

	example:
	<pre><code>
	---TITLE
	Mickey's day
	</code></pre>
</div>

<hr/>

<div>
	<p><strong>Define characters</strong></p>

	<pre><code>
	---CAST
	Starring <i>folder_path</i> as <i>charactername_you_define</i>
	</code></pre>

	example:
	<pre><code>
	---CAST
	Starring mickey as M
	</code></pre>

	See more details <a href="#howtoadd">How to add your characters</a>
</div>

<hr/>

<div>
	<p><strong>Draw characters</strong></p>

	Right-pointing
	<pre><code>
	<i>character_name_you_define</i> : <i>emoticon</i> <(" <i>script</i> ")
	</code></pre>

	Left-pointing
	<pre><code>
	<i>character_name_you_define</i> : (" <i>script</i> ")> <i>emoticon</i>
	</code></pre>

	*Use <code>\n</code> for line break.<br/>
	*Available emoticons are <a href="#emoticontable">here</a>
	<br/>

</div>

<div>
	<br/>
	<p><strong>Divide scene</strong></p>
	<pre><code>
	---
	</code></pre>

	example:
	<br/>
	<img src="./img/doc_script.png">
	<br/>
</div>


<hr/>


<div id="howtoadd">
	<p><strong>How to add your character</strong></p>

	<p>
	1. Prepare PNG files to represent each emoticon.<br/>
	2. Name each file as corresponding numbers on <a href="#emoticontable">Emoticon Table.</a><br/>
	3. Name the folder as a character name.<br/>
	</p>
	It will look like this.<br/>
	<img src='./img/character_sample.png' width="750px"/>
</div>

<hr/>

<div id="emoticontable">
	<strong>Emoticon Table</strong>
	<table>
		<tr>
			<th>Index</th>
			<th>Expression</th>
		</tr>
		<tr>
			<th>0</th>
			<th>('-')</th>
		</tr>
		<tr>
			<th>1</th>
			<th>(;ﾟﾛﾟ)</th>
		</tr>
		<tr>
			<th>2</th>
			<th>(^o^)</th>
		</tr>
		<tr>
			<th>3</th>
			<th>(｀ε´)</th>
		</tr>
		<tr>
			<th>4</th>
			<th>(･_･)</th>
		</tr>
		<tr>
			<th>5</th>
			<th>(:_;)</th>
		</tr>

		<tr>
			<th>-</th>
			<th>*Additional Expression</th>
		</tr>

		<tr>
			<th>100</th>
			<th>ʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʔ-̫͡-ʕ•̫͡•ʔ*̫͡*ʔ-̫͡-ʔ</th>
		</tr>
		<tr>
			<th>101</th>
			<th>((⊂(`ω´∩)</th>
		</tr>
		<tr>
			<th>102</th>
			<th>(;´༎ຶД༎ຶ`)</th>
		</tr>
		<tr>
			<th>103</th>
			<th>(๑˃̶ꇴ˂̶)♪⁺</th>
		</tr>
		<tr>
			<th>104</th>
			<th>ฅ^•ﻌ•^ฅ</th>
		</tr>
	</table>
	<br/>
	*As an advanced option, you can build your emoticon table by modifying ComicStripScript.js. User Emoticons's id starts from 100.<br/>
	<br/>
	More default expressions will be added in future. It's aiming to have compatibilities between characters, so you can easily change the character with same scripts.<br/>
</div>

<hr/>

<div>
	<strong>Full example with User Emoticons</strong><br/>
	<br/>
	<img src="./img/doc_full.png">
	<br/>


	<br/>
	To start building your own, write codes between &lt;code id="comicsource"&gt; &lt;/code&gt; in empty.html
</div>


