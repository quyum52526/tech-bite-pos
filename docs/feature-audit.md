# Feature card audit

Every card in `src/lib/i18n/en.ts → features.items` is backed by the app (`quyum52526/POS-Software`,
audited at commit `e8e6553`). Re-check a card against its source before changing its copy.

| Tab | Card | Evidence in the app |
|---|---|---|
| Sales & POS | barcode | `Product` barcode, `inventory/services/products.ts` generateBarcode, `inventory/barcodes` page |
| | shifts | `Shift` (openingFloat, countedCash, expectedCash, cashOverShort), `pos/lib/shift-audit-engine.ts` |
| | safeDrops | `ShiftCashMovementType` PAY_IN / PAY_OUT / SAFE_DROP |
| | boxPiece | `ProductUnitConversion`, `Unit` PCS/KG/GM/DOZEN/BOX/PACK |
| | layaways | `LayawayStatus` BOOKED → FULFILLED, `sales/services/layaway.ts` |
| | quotations | `Quotation` (validUntil), converts to sale |
| | receipts | `DigitalReceiptLog`, `ReceiptChannel` SMS/WHATSAPP, `PrintFormat` THERMAL/A4 |
| | returns | `SalesReturn`, `RefundMethod` CASH/BKASH/NAGAD/STORE_CREDIT/DUE_ADJUSTMENT/EXCHANGE |
| Inventory | fefo | `StockBatch` (expiryDate), `inventory/services/batches.ts` |
| | serial | `ProductItemSerial`, `ItemSerialStatus` |
| | transfers | `StockTransfer` (SOURCE_PUSH/DESTINATION_PULL, priority), `GoodsReceivedNote` (good/damaged/shortage/overage/loss) |
| | audits | `StockAudit` (scope FULL_STORE/CATEGORY_WISE/BRAND_WISE, approvedById, totalVarianceCost) |
| | bom | `ProductionBatch` + inputs/outputs/wastage, packagingCost |
| | purchasing | `PurchaseOrder`, `PurchaseInvoice`, `PurchaseReturnType` RETURN/EXCHANGE, `VendorPayment` |
| Accounting | journals | `JournalEntry`/`JournalLine`, `JournalSourceType` |
| | landed | `LandedCostCharge`, `LandedCostType`, `AllocationBasis` |
| | mfs | `PaymentMethodDefaultAccount`, `Payment.reference` |
| | zreport | `reports/services/daily-closing.ts` |
| | vouchers | `Voucher` PAYMENT/RECEIPT/JOURNAL with void reason, `Expense` |
| | accountTransfers | `AccountTransfer`, `accounting/services/branch-vault.ts` |
| CRM | loyalty | `MembershipTier` STANDARD→PLATINUM, `LoyaltyTierRule` |
| | coupons | `CustomerOccasionReward`, `OccasionConfig` |
| | tieredPromos | `PromotionType` TIERED_VOLUME / BUNDLE_COMBO, `StackingStrategy` |
| | bxgy | `PromotionType` BUY_X_GET_Y / HAPPY_HOUR / CART_THRESHOLD |
| HR & Security | staffDirectory | `Employee` (designation, branch, salaryType, userId) |
| | attendance | `Attendance` (checkIn/checkOut), `AttendanceStatus`, half-day = 0.5 absence in payroll |
| | payroll | `Payroll` (bonuses, deductions, journalEntry), `hr/components/payroll-slip-dialog.tsx` |
| | commissions | `CommissionRule` (basePercentage, tiersJson, categoryOverridesJson) |
| | roles | `modules/auth/rbac.ts` permissions, `SecurityEventType` ACCOUNT_LOCKED (5 attempts) |
| Reports | pnl | `reports/services/financial.ts` (P&L, balance sheet, VAT) |
| | payablesReceivables | `purchases/lib/ap-aging.ts`, `customers/services/aging.ts` |
| | cashierPerformance | `reports/services/sales.ts` (cashiers, over/short, salesperson commission) |
| | dayBook / trialBalance / cashMovement | `accounting-reports/services/*` |
| | yearEnd | `FinancialYear` (closingEntryId, reopen with reason) |
| | inventoryHealth | `reports/services/inventory-bi.ts` (ABC, GMROI, dead/slow, days of cover) |
| | auditLogs | `reports/services/audit.ts` (9 categories) |
| Omnichannel | socialOrders | `OnlineOrder` (channel, status, courierName, trackingNumber) |
| | codSettlement | `OnlineOrder` (codAmount, advancePaid, remittanceEntryId) |
| | smsCampaigns | `SmsCampaign` (targetSegment, scheduledAt, estimatedCost, sent/failed) |
| | dueRecovery | `Customer` (creditLimit, outstandingBalance), `/api/communication/due-reminders` |
| | rfmInsights | `RfmSegment`, `CustomerRfmSnapshot` |

## Claims removed because the app does not support them (yet)

Manager PIN at the counter · weighted/price-embedded barcodes · safe-drop limit prompt · quotation PDF ·
MFS charge tracking · expense receipt photos · Z-report day locking · automated courier tracking ·
before/after values in the audit trail · warranty lookups · "Bronze" tier (it is Standard) · "Dormant" RFM segment.
