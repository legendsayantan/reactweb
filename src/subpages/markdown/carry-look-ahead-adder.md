## What actually is Carry Look Ahead Adder?

A clear understanding of **full adder** and **ripple carry adder** is required to understand this concept.

There is a part inside the ripple carry adder circuit that is responsible for generating and propagating the carry values *only*. This part, when designed seperately , is called a **Carry Look Ahead Generator**(not adder). But the significance of creating it as an independent circuit is, we can simplify a lot of inner logic and make this circuit efficient.

When we attach some more circuits (half adders and xor gates) to a Carry Look Ahead generator, what we get is a **Carry Look Ahead Adder**.

### Derivation of a single stage in Carry Look Ahead Generator
As we previously said, cla generator is just the circuit that calculates carry values. So we can start by drawing a truth table of carry values in binary addition.

Suppose , our adder is at stage 0 of addition. so we will call our inputs as A0 and B0. The carry input to this stage is C0. The carry output of this stage is C1 (because we would use this as the **carry input** in stage 1).

Let's write down the truth table -

![](https://res.cloudinary.com/da0cp0s8l/image/upload/v1684761379/cla-1bit_zcsqdh.png)

now, lets suppose `G = A AND B` and `P = A XOR B`. We can complete the truth table as following - 

![](https://res.cloudinary.com/da0cp0s8l/image/upload/v1684761421/cla-1bit-filled_jixe5s.png)

After we are here, now let's completely ignore the values of A and B, because we can calculate G and P values, from A and B using a half adder.(G is AND/carry and P is XOR/sum)

Our Carry Look Ahead Generator circuit has to generate carry values **using G, P and C0 (previous carry) as inputs**. Let's draw a K-Map for C1.

![](https://res.cloudinary.com/da0cp0s8l/image/upload/v1684762602/cla-kmap_thvhqy.png)

Let's simplify the logic - 

`C1 = ( C0 . !G0 . P0 ) + ( G0 . !P0)`

`C1 = G0 + (P0 . C0)`

So in a general form , the logic of one single stage of carry generation would be `C(i+1) = Gi + (Pi . Ci)`, where i = stage id.

### Creation of multi-stage Carry Look Ahead Generator
As we just saw, a One-stage Carry Look Ahead Generator circuit can perform carry generation for one bit of addition. But often times we need 4bit, 8 bit carry generation. This is why we will use multi-stage circuit.

As we know, the carry generation logic for a single stage is `C(i+1) = Gi + (Pi . Ci)`.
So, for a 2 bit addition, we will need 2 stages of carry generation. So, the carry generation logic for 2 bit addition would be -

`C2 = G1 + (P1 . C1)`

But wait! we also know the formula of C1, right? So, we can replace C1 with the formula of C1.

`C2 = G1 + (P1 . (G0 + (P0 . C0)))`

or,
`C2 = G1 + (P1 . G0) + (P1 . P0 . C0)`

And there we have the carry generator logic for 2 bit addition. We can create circuit diagram from this logic because it is already in SOP form.

We can also create the carry generation logic for 4 bit addition, 8 bit addition and so on, using the same method.


### Carry Look Ahead Adder 
We have to add the actual adder parts to a Carry Look Ahead Generator to get the full Carry Look Ahead Adder.

![](https://storage.googleapis.com/tb-img/production/20/05/F1_U.B_Madhu_16.05.20_D3.png)