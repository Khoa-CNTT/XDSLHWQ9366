package com.datn.controller.payment;/*
 * @project team30
 * @author Huy
 */

import lombok.Builder;

@Builder
public abstract class PaymentDTO {

    public static class VNPayResponse {
        public String code;
        public String message;
        public String paymentUrl;

        // Private constructor để chỉ có thể tạo thông qua Builder
        public VNPayResponse(String code, String message, String paymentUrl) {
            this.code = code;
            this.message = message;
            this.paymentUrl = paymentUrl;
        }

        // Builder class
        public static class Builder {
            private String code;
            private String message;
            private String paymentUrl;

            public Builder code(String code) {
                this.code = code;
                return this;
            }

            public Builder message(String message) {
                this.message = message;
                return this;
            }

            public Builder paymentUrl(String paymentUrl) {
                this.paymentUrl = paymentUrl;
                return this;
            }

            public VNPayResponse build() {
                return new VNPayResponse(code, message, paymentUrl);
            }
        }

        // Phương thức static để tạo builder
        public static Builder builder() {
            return new Builder();
        }
    }
}
