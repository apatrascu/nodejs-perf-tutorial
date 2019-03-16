# Profiling using built-in Node.JS profiler

The main goal of a profiler is to measure all the CPU ticks spent on executing functions in your application.

For instance, Google Chrome (or any other modern browser) has a built-in profiler in DevTools, recording all the information about functions and how long it takes to execute them into a log file. Afterwards, Google Chrome analyzes this log file, providing you with human-readable information of what’s happening, so you can understand it and find the bottleneck.

NodeJS has a built-in profiler as well, but with one difference. It doesn’t analyze log files as Google Chrome does. Instead, it just collects all the information into log file and that’s it. It means, that you need to have some separate tool that can understand this log file and provide you with human-readable information.

We assume that we use the code from `script.js`. First, let's see how long it takes to run:

```bash
time node script.js 

real	0m3,269s
user	0m3,262s
sys	    0m0,008s
```

Ok, we need to see what's happening. To profile the application, run:

```bash
node --prof script.js
```

After the execution is finished, you will see a file called `isolate-0x...-v8.log`. 

```bash
ls -l isolate*

-rw-r--r-- 1 alecsandru alecsandru 773796 mar 16 15:06 isolate-0x3716d10-v8.log
```

That is similar to a core dump. We need to make it more readable, so we run:

```bash
node --prof-process isolate-0x3716d10-v8.log > processed.log
```

Open `processed.log` and inspect it. You will get something similar to the content bellow: 

```text
Statistical profiling result from isolate-0x3716d10-v8.log, (3141 ticks, 1 unaccounted, 0 excluded).

 [Shared libraries]:
   ticks  total  nonlib   name

 [JavaScript]:
   ticks  total  nonlib   name
      1    0.0%    0.0%  Builtin: StoreIC
      1    0.0%    0.0%  Builtin: MapPrototypeGet

 [C++]:
   ticks  total  nonlib   name
   3078   98.0%   98.0%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
     30    1.0%    1.0%  node::native_module::NativeModuleLoader::CompileFunction(v8::FunctionCallbackInfo<v8::Value> const&)
      5    0.2%    0.2%  write
      4    0.1%    0.1%  node::binding::GetInternalBinding(v8::FunctionCallbackInfo<v8::Value> const&)
      2    0.1%    0.1%  v8::internal::Scanner::ScanIdentifierOrKeywordInner(v8::internal::Scanner::LiteralScope*)
      2    0.1%    0.1%  fwrite
      1    0.0%    0.0%  v8::internal::interpreter::BytecodeGenerator::VisitForAccumulatorValue(v8::internal::Expression*)
      1    0.0%    0.0%  v8::internal::compiler::(anonymous namespace)::RemoveElement(v8::internal::ZoneVector<v8::internal::compiler::LiveRange*>*, v8::internal::compiler::LiveRange*)
      1    0.0%    0.0%  v8::internal::SerializerDeserializer::Iterate(v8::internal::Isolate*, v8::internal::RootVisitor*)
      1    0.0%    0.0%  v8::internal::Scavenger::CheckAndScavengeObject(v8::internal::Heap*, unsigned long) [clone .constprop.296]
      1    0.0%    0.0%  v8::internal::Map::GetConstructor() const
      1    0.0%    0.0%  v8::internal::LookupIterator::PrepareForDataProperty(v8::internal::Handle<v8::internal::Object>)
      1    0.0%    0.0%  v8::internal::InnerPointerToCodeCache::GetCacheEntry(unsigned long)
      1    0.0%    0.0%  v8::internal::HashTable<v8::internal::StringTable, v8::internal::StringTableShape>::Rehash(v8::internal::Isolate*)
      1    0.0%    0.0%  v8::internal::Expression::IsPropertyName() const
      1    0.0%    0.0%  v8::internal::CompilerDispatcher::IsEnqueued(v8::internal::Handle<v8::internal::SharedFunctionInfo>) const
      1    0.0%    0.0%  v8::internal::Compiler::Compile(v8::internal::Handle<v8::internal::SharedFunctionInfo>, v8::internal::Compiler::ClearExceptionFlag)
      1    0.0%    0.0%  v8::internal::AstValueFactory::GetString(unsigned int, bool, v8::internal::Vector<unsigned char const>)
      1    0.0%    0.0%  v8::internal::Assignment::Assignment(v8::internal::AstNode::NodeType, v8::internal::Token::Value, v8::internal::Expression*, v8::internal::Expression*, int)
      1    0.0%    0.0%  std::ostream::sentry::sentry(std::ostream&)
      1    0.0%    0.0%  std::_Rb_tree_insert_and_rebalance(bool, std::_Rb_tree_node_base*, std::_Rb_tree_node_base*, std::_Rb_tree_node_base&)
      1    0.0%    0.0%  node::CreateProcessObject(node::Environment*, std::vector<std::string, std::allocator<std::string> > const&, std::vector<std::string, std::allocator<std::string> > const&)
      1    0.0%    0.0%  mprotect

 [Summary]:
   ticks  total  nonlib   name
      2    0.1%    0.1%  JavaScript
   3138   99.9%   99.9%  C++
      1    0.0%    0.0%  GC
      0    0.0%          Shared libraries
      1    0.0%          Unaccounted

 [C++ entry points]:
   ticks    cpp   total   name
   3112   99.6%   99.1%  v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*)
      7    0.2%    0.2%  v8::internal::Runtime_CompileLazy(int, v8::internal::Object**, v8::internal::Isolate*)
      2    0.1%    0.1%  v8::internal::Runtime_KeyedStoreIC_Miss(int, v8::internal::Object**, v8::internal::Isolate*)
      2    0.1%    0.1%  v8::internal::Runtime_InterpreterDeserializeLazy(int, v8::internal::Object**, v8::internal::Isolate*)
      1    0.0%    0.0%  v8::internal::Runtime_StoreIC_Miss(int, v8::internal::Object**, v8::internal::Isolate*)
      1    0.0%    0.0%  v8::internal::Runtime_SetProperty(int, v8::internal::Object**, v8::internal::Isolate*)

 [Bottom up (heavy) profile]:
  Note: percentage shows a share of a particular caller in the total
  amount of its parent calls.
  Callers occupying less than 1.0% are not shown.

   ticks parent  name
   3078   98.0%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   3078  100.0%    v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*)
   3078  100.0%      LazyCompile: ~handleError internal/crypto/pbkdf2.js:74:21
   3078  100.0%        LazyCompile: ~pbkdf2Sync internal/crypto/pbkdf2.js:44:20
   3078  100.0%          LazyCompile: ~hash /home/alecsandru/work/github/nodejs-perf-tutorial/01-builtin/script.js:4:14
   3078  100.0%            Eval: ~<anonymous> /home/alecsandru/work/github/nodejs-perf-tutorial/01-builtin/script.js:1:1
```

Lets look at Bottom (up) heavy profile. That’s the place where you get information about more heavy functions.

As we can see, almost all of the CPU ticks are spent in `pbkdf2Sync` function in `crypto.j` module which is called from our `hash` function. This is our bottleneck. 

Knowing that, we can optimize it, replacing sync function with async and provide a callback that will do some stuff after hashing.

The optimized code can be found in `script-opt.js`. We run it:

```bash
time node script-opt.js 

real	0m0,944s
user	0m3,461s
sys	    0m0,004s
```

We see that we get a nice 3.5X speedup!

As an exercise, run the profiler again and compare the output with the initial one.
