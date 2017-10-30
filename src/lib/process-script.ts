let pendingScripts: Array<any> = []
let pendingCallbacks: Array<any> = []
let needsProcess = false

/**
 * Process math in a script node using MathJax
 * @param {MathJax}  MathJax
 * @param {DOMNode}  script
 * @param {Function} callback
 */
export function processScript(MathJax: any, script: any, callback: any) {
  pendingScripts.push(script)
  pendingCallbacks.push(callback)
  if (!needsProcess) {
    needsProcess = true
    setTimeout(() => doProcess(MathJax), 0)
  }
}

function doProcess(MathJax: any) {
  MathJax.Hub.Queue(function() {
    const oldElementScripts = MathJax.Hub.elementScripts
    MathJax.Hub.elementScripts = (element: any) => pendingScripts

    try {
      return MathJax.Hub.Process(null, () => {
        // Trigger all of the pending callbacks before clearing them
        // out.
        for (const callback of pendingCallbacks) {
          callback()
        }

        pendingScripts = []
        pendingCallbacks = []
        needsProcess = false
      })
    } catch (e) {
      // IE8 requires `catch` in order to use `finally`
      throw e
    } finally {
      MathJax.Hub.elementScripts = oldElementScripts
    }
  })
}
