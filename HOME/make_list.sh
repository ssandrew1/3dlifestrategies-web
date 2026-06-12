
ls -lrt > /tmp/out.txt
while read line 
 do
	# echo "$line"
	f=`echo $line | awk '{print $9}'`
	s=`echo $line | awk '{print $5}'`
	# echo "f=$f"
	echo "
<tr>
  <td><a href=\"${f}\">${f}</a></td>
  <td>${s}</td>
  <td>LearnLM Files to Review</td>
</tr>
" >> out.html

done < /tmp/out.txt

