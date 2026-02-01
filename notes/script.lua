local js = require "js"
local window = js.global
local document = window.document

function getNotes()
    -- USE ABSOLUTE PATH: This starts from the site root
    -- Ensure your file is at: your-site-folder/notes/notes.json
    local fetch_promise = window:fetch("http://127.0.0.1:5500/notes/notes.json")
    
    local p1 = fetch_promise["then"](fetch_promise, function(res)
        -- Check if the file was found
        if res == nil or not res.ok then
            local container = document:getElementById("status-list")
            if container then
                container.innerHTML = "Error: Could not find <code>/notes/notes.json</code><br>Check your file location."
                container.style.color = "red"
            end
            return nil
        end
        return res:json()
    end)
    
    p1["then"](p1, function(data)
        if data == nil then return end
        
        local container = document:getElementById("status-list")
        if not container then return end
        
        local html = ""
        
        -- Loop through the data
        for i = 0, data.length - 1 do
            local item = data[i]
            
            -- Handle missing fields safely
            local date = item.date or item.Date or "No Date"
            local content = item.content or item.message or item.Body or ""
            
            html = html .. "<div class='status-note'>"
            html = html .. "<strong>" .. tostring(date) .. "</strong>: " .. tostring(content)
            html = html .. "</div><hr>"
        end
        
        container.innerHTML = html
    end)
end

getNotes()