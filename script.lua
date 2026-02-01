local js = require "js"
local window = js.global

function getNotes()
    window:fetch("/notes/notes.json"):then(function(res) return res:json() end):then(function(data)
    local container = window.document:getElementById("status-list")
    local html = ""
    
    -- Loop through the JSON array
    for i=0, data.length - 1 do
      local item = data[i]
      html = html .. "<div class='status-item'>"
      html = html .. "<strong>" .. item.date .. "</strong>: " .. item.content
      html = html .. "</div><hr>"
    end
    
    container.innerHTML = html
  end)
end