# Simple Javascript TextRank
자바스크립트로 구현한 텍스트 랭크 알고리즘입니다.

---
### 사용법

```
var textrank = new TextRank(sentence);
textrank.getSummarizedOneText();
textrank.getSummarizedThreeText();
```

### 구현방법
1. 문장을 "\n" 단위로 구분합니다.
2. 문장개수에 따라 N x N WeightMetrics를 생성합니다.
3. WeightMetrics를 자카드 지수로 업데이트합니다.
4. 1 / N 으로 초기화한 점수 배열을 WeightMetrics로 20회 업데이트합니다.
5. 점수배열 순위에 따라 문장을 가져옵니다.

### 한계점
1. 자카드 지수를 구할때 단순히 연속된 글자 3개가 들어있다면 교집합으로 연산했습니다.
2. 자연어처리 로직이 들어가있지 않기 때문에 성능이 좋지 않습니다.