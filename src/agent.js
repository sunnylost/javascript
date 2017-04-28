import Assert from './assert'
import JobQueue from './job_queue'
import Realm from './realm'
import Script from './script'
import ExecutionContext from './execution_context'

const SCRIPT_JOBS  = 'ScriptJobs',
      PROMISE_JOBS = 'PromiseJobs'

class Agent {
    constructor() {
        this.executionContextStack   = []
        this.runningExecutionContext = null
        this.jobQueues               = {
            ScriptJobs : new JobQueue( SCRIPT_JOBS ),
            PromiseJobs: new JobQueue( PROMISE_JOBS )
        }

        this.__CanBlock__ = true
    }

    //https://tc39.github.io/ecma262/#sec-enqueuejob
    enqueueJob( queueName, job, args ) {
        Assert( typeof queueName === 'string', `${ queueName } is a string.` )
        Assert( queueName in this.jobQueues, `${ queueName } is a valid job queue name.` )
//        Assert( this.jobQueues[ queueName ].length === args.length, 'arguments number is right.' )

        let callerContext        = this.runningExecutionContext,
            callerRealm          = callerContext.Realm,
            callerScriptOrModule = callerContext.ScriptOrModule,
            pending              = {
                __Job__           : job,
                __Arguments__     : args,
                __Realm__         : callerRealm,
                __ScriptOrModule__: callerScriptOrModule,
                __HostDefined__   : undefined
            }

        this.jobQueues[ queueName ].push( pending )
    }

    InitializeHostDefinedRealm() {
        let realm      = Realm.CreateRealm(),
            newContext = new ExecutionContext()

        newContext.Function       = null
        newContext.Realm          = realm
        newContext.ScriptOrModule = null

        this.executionContextStack.push( newContext )
        this.runningExecutionContext = newContext

        let global    = undefined,
            thisValue = undefined

        Realm.SetRealmGlobalObject( realm, global, thisValue )
        let globalObj = this.SetDefaultGlobalBindings( realm )
        //Create any implementation-defined global object properties on globalObj
    }

    /**
     * https://tc39.github.io/ecma262/#sec-runjobs
     *
     * Ts this correct to attached it on Agent?
     */
    RunJobs( sourceText, hostDefined, type = 'Script' ) {
        this.InitializeHostDefinedRealm()

        if ( type === 'Script' ) {
            this.enqueueJob( SCRIPT_JOBS, Script.ScriptEvaluationJob, [ sourceText, hostDefined ] )
        } else if ( type === 'Module' ) {
            //this.enqueueJob( SCRIPT_JOBS, Module.TopLevelModuleEvaluationJob, [ sourceText, hostDefined ] )
        }

        //repeat
        //while(1) {
        //suspend
        this.executionContextStack.length = 0
        this.runningExecutionContext      = null

        Assert( this.executionContextStack.length === 0, 'execution context stack is empty.' )
        let nextQueue   = this.jobQueues[ SCRIPT_JOBS ], //choose a job queue, implementation defined.
            nextPending = nextQueue.shift(),
            newContext  = new ExecutionContext()

        newContext.Function       = null
        newContext.Realm          = nextPending.__Realm__
        newContext.ScriptOrModule = nextPending.__ScriptOrModule__

        this.executionContextStack.push( newContext )
        this.runningExecutionContext = newContext

        let result = nextPending.__Job__.apply( null, nextPending.__Arguments__ ) //run job
        if ( result ) { //abrupt completion
            //HostReportErrors([result.__Value__])
        }
        //}
    }

    SetDefaultGlobalBindings() {

    }
}

export default Agent
