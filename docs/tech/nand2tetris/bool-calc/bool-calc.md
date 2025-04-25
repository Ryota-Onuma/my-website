---
sidebar_position: 4
---

# ブール算術

Nand2Tetrisの第2章をやる。第1章で作成した論理ゲートを使って、半加算器、全加算器、加算機を作成する。

## 半加算器

A(1bit)とB(1bit)の入力を受けとる。A + Bの2進数の計算を行い、1桁目をsumのピン、2桁目をcarryのピンに出力する。

表にすると以下。

| A | B | sum | carry |
| ---- | ---- | ---- | ---- |
| 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 1 | 1 | 1 |

sumの出力と、carryの出力それぞれをどう実現するかを考える。

sumだけに注目すると以下のようになる。1 + 1 = 10になるので、sumは0である。

| A | B | sum |
| ---- | ---- | ---- |
| 0 | 0 | 0 |
| 1 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 1 | 0 |

これはXorゲートの実装と一致する。

carryだけに注目すると以下のようになる。1 + 1 = 10のときのみ、carryビットは1になり、それ以外のときは0になる。

| A | B | carry |
| ---- | ---- | ---- |
| 0 | 0 | 0 |
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 1 | 1 |

これはAndゲートの実装と一致する。

以上をHDLに反映すると以下になる。

```hdl
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/2/HalfAdder.hdl
/**
 * Computes the sum of two bits.
 */
CHIP HalfAdder {
    IN a, b;    // 1-bit inputs
    OUT sum,    // Right bit of a + b 
        carry;  // Left bit of a + b

    PARTS:
    Xor(a=a , b=b , out=sum);
    And(a=a , b=b , out=carry);
}
```

## 全加算器

A,B,C 3つのbitが与えられる。A + B + Cの結果の最上位bit(carry)と最下位bit(sum)を出力する全加算器を作る。
入出力を表にすると以下である。

| A | B | C | carry | sum |
|---|---|---|--------|-----|
| 0 | 0 | 0 |   0    |  0  |
| 0 | 0 | 1 |   0    |  1  |
| 0 | 1 | 0 |   0    |  1  |
| 0 | 1 | 1 |   1    |  0  |
| 1 | 0 | 0 |   0    |  1  |
| 1 | 0 | 1 |   1    |  0  |
| 1 | 1 | 0 |   1    |  0  |
| 1 | 1 | 1 |   1    |  1  |


以下のような手順を実行していくと、A + B + Cの結果の最上位bit(carry)と最下位bit(sum)が得られる。
半加算器をHalfAdderとすると、

>HalfAdder(A,B)　→　tmpCarry, tmpSum <br/>
>↓ <br/>
>HalfAdder(C,tmpSum)　→　tmpCarry2, **sum** <br/>
>↓ <br/>
>Or(tmpCarry,tmpCarry2) → **carry** <br/>

ほしいsumが、A,B,Cを全部足した結果の1桁目に相当するのは直感的である。
そして、2回登場する半加算器での計算結果として得られる2つのcarryのどちらかが1ならば、全体のcarryも1になる。

```hdl
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/2/FullAdder.hdl
/**
 * Computes the sum of three bits.
 */
CHIP FullAdder {
    IN a, b, c;  // 1-bit inputs
    OUT sum,     // Right bit of a + b + c
        carry;   // Left bit of a + b + c

    PARTS:
    HalfAdder(a=a,b=b,sum=tmpSum,carry=tmpCarry);
    HalfAdder(a=c,b=tmpSum,sum=sum,carry=tmpCarry2);
    Or(a=tmpCarry,b=tmpCarry2,out=carry); 
}
```

## 加算器

今回は16bit加算器を作る。16bitのAと16bitのBを足した結果として、16bitのoutを得る。

計算は[0]のbitから順番に行う。最初に半加算器でa[0]とb[0]を足し、得られたsumをout[0]、carryを次の計算に引き継ぐために、適当な内部ピンにわたす。

次に[1]の計算を行う。a[0]とb[0]を足すことに加え、[0]での計算からもらったcarryも計算に含めないと繰り上げの計算ができないので、全加算器を使う。

以降は[15]まで全加算器を使って加算をやり続ける。最後、溢れたcarryは捨ててOK（Nand2Tetrisでの仕様)


HDLは以下。

```hdl
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/2/Add16.hdl
/**
 * 16-bit adder: Adds two 16-bit two's complement values.
 * The most significant carry bit is ignored.
 */
CHIP Add16 {
    IN a[16], b[16];
    OUT out[16];

    PARTS:
    HalfAdder(a=a[0],  b=b[0], sum=out[0], carry=tmpCarry);
    FullAdder(a=a[1],  b=b[1],  c=tmpCarry, sum=out[1], carry=tmpCarry2);
    FullAdder(a=a[2],  b=b[2],  c=tmpCarry2,  sum=out[2],  carry=tmpCarry3);
    FullAdder(a=a[3],  b=b[3],  c=tmpCarry3,  sum=out[3],  carry=tmpCarry4);
    FullAdder(a=a[4],  b=b[4],  c=tmpCarry4,  sum=out[4],  carry=tmpCarry5);
    FullAdder(a=a[5],  b=b[5],  c=tmpCarry5,  sum=out[5],  carry=tmpCarry6);
    FullAdder(a=a[6],  b=b[6],  c=tmpCarry6,  sum=out[6],  carry=tmpCarry7);
    FullAdder(a=a[7],  b=b[7],  c=tmpCarry7,  sum=out[7],  carry=tmpCarry8);
    FullAdder(a=a[8],  b=b[8],  c=tmpCarry8,  sum=out[8],  carry=tmpCarry9);
    FullAdder(a=a[9],  b=b[9],  c=tmpCarry9,  sum=out[9],  carry=tmpCarry10);
    FullAdder(a=a[10], b=b[10], c=tmpCarry10, sum=out[10], carry=tmpCarry11);
    FullAdder(a=a[11], b=b[11], c=tmpCarry11, sum=out[11], carry=tmpCarry12);
    FullAdder(a=a[12], b=b[12], c=tmpCarry12, sum=out[12], carry=tmpCarry13);
    FullAdder(a=a[13], b=b[13], c=tmpCarry13, sum=out[13], carry=tmpCarry14);
    FullAdder(a=a[14], b=b[14], c=tmpCarry14, sum=out[14], carry=tmpCarry15);
    FullAdder(a=a[15], b=b[15], c=tmpCarry15, sum=out[15], carry=carryOut);  // carryOutはnand2tetrisだと切り捨てる
}
```


## インクリメンタ

16bitインクリメンタを作る。入力in[16]に対して、`0000000000000001`を足して返すだけでOKなので簡単。

```hdl
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/2/Inc16.hdl
/**
 * 16-bit incrementer:
 * out = in + 1
 */
CHIP Inc16 {
    IN in[16];
    OUT out[16];

    PARTS:
    Add16(a=in,b[0]=true,b[1..15]=false,out=out);
}
```


## ALU

16bitのALU(算術論理演算装置: Arithmetic Logic Unit)を作る。

AとBという16bitの入力を受け取る。さらに、zx,nx,zy,ny,f,no（それぞれ1bit)の制御bitも受け取る。
制御bitを順番に見ていき、それぞれの制御bitの0、1に応じて行いたい演算を行っていけばOK。
いわゆるif文は、ifの結果の演算を先に済ませておいた上で、16bitマルチプレクサを使うことで実現できる。

また、zrの計算(ALUによる計算結果のoutが0に等しいかどうか)が少し面倒であった。outの各bitがすべて0であれば、outは0ということになるので、Or16Wayゲートがあれば簡単に実現できる。しかし、我々はOr8Wayゲートしか作っておらず、またOr16Wayゲートを自前で作ることは（少なくともweb-ideでは）許されていないので困った。また、内部ピンに対して特定のbit範囲を指定してOr8Wayゲートのインプットに使うこともHDLの制約でできないので困った。これの解決策は、書籍のp.387に書いてあった。`out[0..7]=outFirst7`のようにoutからのマッピング時にbit範囲を指定して新たな内部ピンに割り当てることで解決できた。


最終的なHDLは以下である。

```hdl
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/2/ALU.hdl
/**
 * ALU (Arithmetic Logic Unit):
 * Computes out = one of the following functions:
 *                0, 1, -1,
 *                x, y, !x, !y, -x, -y,
 *                x + 1, y + 1, x - 1, y - 1,
 *                x + y, x - y, y - x,
 *                x & y, x | y
 * on the 16-bit inputs x, y,
 * according to the input bits zx, nx, zy, ny, f, no.
 * In addition, computes the two output bits:
 * if (out == 0) zr = 1, else zr = 0
 * if (out < 0)  ng = 1, else ng = 0
 */
// Implementation: Manipulates the x and y inputs
// and operates on the resulting values, as follows:
// if (zx == 1) sets x = 0        // 16-bit constant
// if (nx == 1) sets x = !x       // bitwise not
// if (zy == 1) sets y = 0        // 16-bit constant
// if (ny == 1) sets y = !y       // bitwise not
// if (f == 1)  sets out = x + y  // integer 2's complement addition
// if (f == 0)  sets out = x & y  // bitwise and
// if (no == 1) sets out = !out   // bitwise not

CHIP ALU {
    IN  
        x[16], y[16],  // 16-bit inputs        
        zx, // zero the x input?
        nx, // negate the x input?
        zy, // zero the y input?
        ny, // negate the y input?
        f,  // compute (out = x + y) or (out = x & y)?
        no; // negate the out output?
    OUT 
        out[16], // 16-bit output
        zr,      // if (out == 0) equals 1, else 0
        ng;      // if (out < 0)  equals 1, else 0

    PARTS:
    // xに対する操作
    Mux16(a=x, b[0..15]=false, sel=zx, out=afterZx);
    Not16(in=afterZx, out=notAfterZx);
    Mux16(a=afterZx,b=notAfterZx, sel=nx, out=afterNx);

    // yに対する操作
    Mux16(a=y, b[0..15]=false, sel=zy, out=afterZy);
    Not16(in=afterZy, out=notAfterZy);
    Mux16(a=afterZy,b=notAfterZy, sel=ny, out=afterNy);

    // xとyを計算する
    Add16(a=afterNx, b=afterNy, out=added);
    And16(a=afterNx, b=afterNy, out=anded);
    Mux16(a=anded,b=added, sel=f, out=afterAndedOrAdded);
    Not16(in=afterAndedOrAdded, out=notAfterAndedOrAdded);
    Mux16(a=afterAndedOrAdded, b=notAfterAndedOrAdded, sel=no, out=out);

    // zrを計算する
    Mux16(a=afterAndedOrAdded, b=notAfterAndedOrAdded, sel=no, out[0..7]=outFirst7);
    Mux16(a=afterAndedOrAdded, b=notAfterAndedOrAdded, sel=no, out[8..15]=outLast7);
    Or8Way(in=outFirst7, out=orFirst7);
    Or8Way(in=outLast7, out=orLast7);
    Or(a=orFirst7, b=orLast7, out=isNotZero);
    Not(in=isNotZero, out=zr);

    // ngを計算する
    Mux16(a=afterAndedOrAdded, b=notAfterAndedOrAdded, sel=no, out[15]=isNegative);
    Or(a=isNegative, b=false, out=ng);   
}
```