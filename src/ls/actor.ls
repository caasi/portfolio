script =
  caasi:
    * dialog: 'Hello.'
      response: ->
        console.log 'Hi, I am...'
        setTimeout ~>
          console.log 'caasi.'
          @done! # or done!, like next example
        , 2000
      children:
        * dialog: 'Bye.'
          response: (done) ->
            console.log 'Bye!'
            done!
        ...
    * dialog: 'Bye.'

script-parser = (script = []) ->
  for let branch in script
    dialog: branch.dialog
    execute: ->
      dialogs = script-parser branch.children
      new Promise (resolve, reject) ->
        if branch.response
          context =
            done: !-> resolve dialogs
          branch.response.call context, context.done
        else
          resolve dialogs

script.caasi = script-parser script.caasi

current = script.caasi
for i, branch of current
  console.log "#{i}. #{branch.dialog}"
talk = (index) !->
  return if index < 0 or current.length <= index
  console.log "> #{current[index].dialog}"
  current[index].execute!then ->
    current := it
    for i, branch of it
      console.log "#{i}. #{branch.dialog}"

window
  ..P ?= {}
    ..ActorManager ?=
      get: ->
        console.log \foo
      talk: talk
