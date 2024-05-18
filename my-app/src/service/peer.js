class PeerService {
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [{
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:google.stun.twilio.com3478"
                    ],
                }]
            })
        }
    }
    async getAnswer(offer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer)
            const answer = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(answer));
            return answer;
        }
    }
    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        }
    }
    async setLocal(answer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
            return answer;
        }
    }
}

export default new PeerService();