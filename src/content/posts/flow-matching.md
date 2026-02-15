---
title: "Flow Matchingの理論"
date: "2026-02-09"
tags: ["Mathematics", "Machine Learning"]
excerpt: "Flow Mathcingをフローの定義から説明する."
category: "Math"
---


# Flow Matchingの調査

最近機械学習で使われているFlow Matchingについて調査する.


## 前提となる数学的な概念.


| 定義(フロー) |
| --- |
| $M$を$C^{\infty}$  級多様体とする。 $C^{\infty}$級写像$F: M \times \mathbb{R} \to M$であって次の条件を満たすものを$1$-パラメータ変換群やフロー(flow)という。<br> (i) 任意の$t \in \mathbb{R}$に対して制限$F_t: M \to M$は$C^{\infty}$級同相である。 <br> (ii) $F_0 = \mathrm{id}_M$である。 <br> (iii) 任意の$t_1, t_2 \in \mathbb{R}$に対して$F_{t_1 + t_2} = F_{t_1} \circ F_{t_2}$が成立する。 <br> また、単に(i), (ii)を満たすものを時間に依存するフロー time-dependent flow という。混同の恐れがなければ単にフローともいうことにする。 |


| 定義(ベクトル場) |
| --- |
|$M$を$C^{\infty}$  級多様体とする。 $C^{\infty}$級写像$X: M \to TM$であって次の条件を満たすものをベクトル場という。<br> (i) 任意の$p \in M$に対して$X_p \in T_p M$が定まっている。 <br> (ii) 任意の$p \in M$に対して$X$は滑らかである.すなわち.座標近傍系$(U, \phi)$を取った時に局所自明化を通じて,$C^{\infty}$級写像$X{\mid}_{T_UM} \circ \phi: \phi^{-1}(U) \to \mathbb{R}^n$が得られる. |


ざっくりしたお気持ちとしては、各点ごとに向きを表すベクトルが定義されていて、点を動かした時に滑らかに変化するものがベクトル場である.




要は各点ごとに向きを表すベクトルが定義されていて、点を動かした時に滑らかに変化するものがベクトル場である.


- フローと時間変化するベクトル場(時間でパラメータ付けされたベクトル場)は一対一対応になっている。
- フローは時間変化を表すと思うと、それにしたがってベクトルが変化する場といてベクトル場を与えられるし、逆にベクトル場があるとその変化量からフローを定義することができる.
- フロー自体は全ての点に対して定義されたもの.


そうすると何が起きるか
フローを微分するとことで時刻$t$にパラメトライズされたベクトル場が得られる.
つまり、時間毎にパラメータづけされたベクトル場に対する微分方程式の解がフローになっている.



フローを使ってやりたいこと
あるデータ$D \in M$があるときに、そのデータをフローにしたがって移動させた時のデータ$D_t = F_t(D) \in M$を求めたい.

これを特に$M$上の確率分布$p_0$に対して変換させることで、$p_t = (F_t)_*p_0$という確率分布を得ることができる.



一旦フローは$\mathbb{R}^n \times \mathbb{R} \to \mathbb{R}^n$という写像として考える.


Flow Matchingとは?
Find $u^θ_t$ generating $p_t$, with $p_0 = p$ and $p_1 = q$.
ただし、 $u^θ_t$ is the vector field of the flow.
ということ
- ソース分布
- ターゲット分布
- 変換を定めるベクトル場(NNで学習)


状況によるが、ソースかターゲット



nnの計算としては $X_{t'} =  X_t + net(X_t, t) (t' - t)$
これは$net(X_t, t)$が該当時刻でのベクトル場を表していると考えられる.
つまり該当時刻でのベクトル場で平行移動してたす合わせる≒積分している。という計算

$X_1 = X_0 + \int_0^1 u_t(X_0) dt \sim  X_0 + \sum net(X_0, t_i) (t_{i+1} - t_i)$
という計算をしている.

このnetを学習させるためにいろいろ損失関数を変形して計算させている.

- conditional flow matchingの場合の学習

```python
import torch
from flow_matching.path import ProbPath
from flow_matching.path.path_sample import PathSample

path: ProbPath = ... # The flow_matching library implements the most common probability paths
velocity_model: torch.nn.Module = ... # Initialize the velocity model
optimizer = torch.optim.Adam(velocity_model.parameters())

for x_0, x_1 in dataloader: # Samples from π0,1 of shape [batch_size, *data_dim]
    t = torch.rand(batch_size) # Randomize time t ∼ U[0, 1]
    sample: PathSample = path.sample(t=t, x_0=x_0, x_1=x_1)
    x_t = sample.x_t
    dx_t = sample.dx_t # dX_t is ψ_t(X0|X1). つまり条件づきでフローを生成したもの
    # If D is the Euclidean distance, the CFM objective corresponds to the mean-squared error
    cfm_loss = torch.pow(velocity_model(x_t, t) - dx_t, 2).mean() # Monte Carlo estimate
    optimizer.zero_grad()
    cfm_loss.backward()
    optimizer.step()
 ```






## 参考文献
[フローマッチングの数学的な基礎](https://zenn.dev/fuwamoekissaten/articles/f01db58571450a)
