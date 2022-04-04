# reddit-r-place-update-intercepter
 
1. Install Fiddler Classic
2. Have r/place tab active
3. Put
```
        if (oSession.HostnameIs("hot-potato.reddit.com") && /\/media\/canvas-images\/\d+-\d-d-[a-zA-Z\d]+\.png$/.test(oSession.url)) {
            try {
                FiddlerObject.utilIssueRequest("POST " + "http://127.0.0.1:9000/?url=" + oSession.url + " HTTP/1.0\r\n\r\n");
            }
            catch(error){ 
                MessageBox.Show("Send failed" + error.ToString());
            }
        }
```
in `static function OnBeforeResponse(oSession: Session) {}`, which is inside `class Handlers{}` (in the FiddlerScript tab)
4. Run `main.js`