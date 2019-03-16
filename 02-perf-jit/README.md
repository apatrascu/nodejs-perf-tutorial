# Getting the JIT code

In this part we are going to use perf to profile a simple application. We will also show how the JIT codes can be viewed.

The simple run:

```bash
time node script.js 

real	0m5,783s
user	0m5,775s
sys	    0m0,008s
```

## Using perf in simple mode

Run the following:

```bash
sudo perf record -a node script.js
```

Then, inspect using `sudo perf report` or, to save the output to a log file: `sudo perf report > perf.log`

You will see something similar to this:

```text
     7.08%  node             perf-2458.map                           [.] 0x00002ab930be58ea
     5.34%  node             perf-2458.map                           [.] 0x00002ab930be58df
     4.65%  node             perf-2458.map                           [.] 0x00002ab930be57e4
     3.29%  node             perf-2458.map                           [.] 0x00002ab930be57f8
     3.00%  node             perf-2458.map                           [.] 0x00002ab930be58b8
     3.00%  node             perf-2458.map                           [.] 0x00002ab930be5835
     2.75%  node             perf-2458.map                           [.] 0x00002ab930be58f0
     2.68%  node             perf-2458.map                           [.] 0x00002ab930be58b2
     2.63%  node             perf-2458.map                           [.] 0x00002ab930be58a4
     2.29%  node             perf-2458.map                           [.] 0x00002ab930be5880
     2.26%  node             perf-2458.map                           [.] 0x00002ab930be5815
     2.10%  node             perf-2458.map                           [.] 0x00002ab930be58f4
     1.99%  node             perf-2458.map                           [.] 0x00002ab930be57e8
     1.91%  node             perf-2458.map                           [.] 0x00002ab930be5845
     1.81%  node             perf-2458.map                           [.] 0x00002ab930be5839
     1.78%  node             perf-2458.map                           [.] 0x00002ab930be57f2
     1.63%  node             perf-2458.map                           [.] 0x00002ab930be58d0
     1.62%  node             perf-2458.map                           [.] 0x00002ab930be57e0
     1.42%  node             perf-2458.map                           [.] 0x00002ab930be57f4
     1.41%  node             perf-2458.map                           [.] 0x00002ab930be57ef
     1.32%  node             perf-2458.map                           [.] 0x00002ab930be5897
     1.30%  node             perf-2458.map                           [.] 0x00002ab930be5864
     1.27%  node             perf-2458.map                           [.] 0x00002ab930be57fc
     1.23%  node             perf-2458.map                           [.] 0x00002ab930be5872
     1.22%  node             perf-2458.map                           [.] 0x00002ab930be583c
     1.22%  node             perf-2458.map                           [.] 0x00002ab930be583f
     1.20%  node             perf-2458.map                           [.] 0x00002ab930be585b
     1.18%  node             perf-2458.map                           [.] 0x00002ab930be580d
     1.03%  node             perf-2458.map                           [.] 0x00002ab930be5819
     1.02%  node             perf-2458.map                           [.] 0x00002ab930be5876
     1.01%  node             perf-2458.map                           [.] 0x00002ab930be587a
```

All good, we found our bad code, but what is with that `perf-XXXX.map`? Those file contains the code that is generated dinamically by Node.JS.

## Making sense of the JIT data

Run the following:

```bash
sudo perf record -a node --perf-basic-prof script.js
```

Then, inspect using `sudo perf report` or, to save the output to a log file: `sudo perf report > per-jit.log`. You can also inspect the `perf.map` by hand, if you go deeper into it in perf.

You will see something similar to this:

```text
    86.98%  node             perf-6806.map                            [.] LazyCompile:*fib /home/alecsandru/work/github/nodejs-perf-tutorial/02-jit/script.js:3
     0.04%  node             node                                     [.] _ZN2v88internal7Scanner4ScanEv
     0.03%  node             node                                     [.] _ZN2v88internal6String17CalculateLineEndsEPNS0_7IsolateENS0_6HandleIS1_EEb
     0.02%  node             node                                     [.] _ZN2v88internal4Zone3NewEm
     0.01%  pgrep            [kernel.kallsyms]                        [k] __inode_permission
     0.01%  node             node                                     [.] _ZN2v88internal10ParserBaseINS0_9PreParserEE21ParseBinaryExpressionEibPb
     0.01%  node             [kernel.kallsyms]                        [k] gen6_read32
     0.01%  node             node                                     [.] _ZN2v88internal10ParserBaseINS0_9PreParserEE20ParseUnaryExpressionEPb
     0.01%  pgrep            [kernel.kallsyms]                        [k] __kmalloc_node
     0.01%  node             node                                     [.] _ZN2v88internal14CodeSerializer15SerializeObjectEPNS0_10HeapObjectENS0_22SerializerDeserializer9HowToCodeENS4_12WhereToPointEi
     0.01%  node             node                                     [.] _ZN2v88internal7Scanner28ScanIdentifierOrKeywordInnerEPNS1_12LiteralScopeE
     0.01%  node             [kernel.kallsyms]                        [k] error_entry
     0.01%  node             node                                     [.] _ZN2v88internal10ParserBaseINS0_6ParserEE25ParseAssignmentExpressionEbPb
     0.01%  node             [kernel.kallsyms]                        [k] handle_pte_fault
     0.01%  node             ld-2.27.so                               [.] do_lookup_x
     0.01%  node             node                                     [.] _ZN2v84base19TemplateHashMapImplImNS_8internal19SerializerReferenceENS0_18KeyEqualityMatcherIlEENS0_23DefaultAllocationPolicyEE14LookupOrInsertIZNS7_14LookupOrInsertERKmjS6_EUlvE_EEPNS0_20TemplateHashMapEntryImS3_EESA_jRKT_S6_.isra.61
```