/**
 * textrank.js
 * 
 * 1. 인풋을 문장단위로 나누어 저장한다.
 * 2. 최초 문장유사도를 계산한다.
 * 3. 수렴할때까지 업데이트한다.
 * 4. 랭킹 5개를 가져온다.
 */

class ProcessSentence {
    
    constructor(sentence) {
        this.sentence = sentence;
    }

    _tokenize() {    
        this.sentenceMetrics = this.sentence.split("\n");
    }

    getSentenceMetrics() {
        this._tokenize();
        return this.sentenceMetrics;
    }
}

class WeightMetrics {

    constructor(sentenceMetrics) {
        this.sentenceMetrics = sentenceMetrics;
        this.weightMetrics = new Float32Array[sentenceMetrics.length][sentenceMetrics.length];
    }

    getWeightMetrics() {
        this._update();
        return this.weightMetrics;
    }

    _update() {
        var weightsLength = this.weightMetrics.length;
        for (var i = 0; i < weightsLength; i++) {
            for (var j = 0; j < weightsLength; j++) {
                var jaccardIndex = _getJaccardIndex(
                    this._splitSentence(this.sentenceMetrics[i]), this._splitSentence(this.sentenceMetrics[j]));
                    this.weightMetrics[i][j] = jaccardIndex;
            }
        }
    }

    _getJaccardIndex(s1, s2) {
        s1Set = set(s1);
        s2Set = set(s2);
        intersect = s1Set | s2Set;
        union = s1Set & s2Set;
        return intersect.length / union.length;
    }

    _splitSentence(sentence) {
        return sentence.split(" ");
    }

}

class TextRank {
    constructor(sentence) {
        this.ps = new ProcessSentence(sentence);
        this.weightMetrics = new WeightMetrics(ps.getSentenceMetrics());
        this.weights = this.weightMetrics.getWeightMetrics();
        this.ranking = new Float32Array[this.weights.length];
    }

    getSummarized() {
        this._initRanking();
        this._updateLoop();
        return this._top1();
    }

    _initRanking() {
        var rankingLength = this.ranking.length;
        for (var i = 0; i < rankingLength; i++) {
            this.ranking[i] = (1 / rankingLength);
        }
    }

    _updateLoop() {
        var rankingLength = this.ranking.length;
        for (var i = 0; i < rankingLength; i++) {
            var tmp = 0;
            for (var j = 0; j < rankingLength; j++) {
                tmp += this.ranking[j] * this.weights[j][i];
            }
            this.ranking[i] = tmp;
        }
    }
}