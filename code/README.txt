Prior to the upgrade where I stopped iterating over the whole grid to do the logic for each agent, the loop often
struggled on the 160x160 grid at a timer interval of 170. After the efficiency upgrade, loop struggling after the
start didn't become common until I took the timer interval down to... hmm, only like 165. Not what I had hoped.

I suppose I really will have to simplify the goo logic to see real gains. Gotta make compute room for those agent brains!

Although, now I think maybe I was testing it wrong. I forget all I learned back when I last worked on this about how best
to test things. I think maybe the timer mechanism is too computationally expensive to be a good guide because it slows
things down too much. I just tried uncommenting the comments I had comparing the goo compute time to the agent compute
time and now I'm seeing that the agents almost always take a negligible amount of time (1-0 ms) compared to the goo
turns, which take 2-10 ms (usually closer to 2.) I'm remembering now that I changed the goo logic to occur less often.

So, now I think the efficiency improvement must have made a difference. Because, just visually I can see that it runs
smoothly as I lower the time interval all the way down to around 130 or so; it's kind of hard to tell. I don't know
where that bar was before, though...

In any case, now grid size shouldn't be such a decisive slowdown factor. Let's try the big grid and see if 130 works ok.
It seems fine around 140-150. Loop struggling as per the timer metric becomes uncommon around 205. For the 160x160 map I
rechecked it just now and it becomes uncommon around 200. Ok, so that's good in that the size doesn't seem to matter much,
but wasn't it struggling less at 170 before? Ugh! Maybe my computer is varying for who knows what reason?