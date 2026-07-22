const InvestigationService = require('../../../ai/investigation/InvestigationService');
// Note: Safely loading SummaryService as the prompt suggested it may or may not be complete.
let SummaryService;
try {
  SummaryService = require('../../../ai/summary/SummaryService');
} catch (e) {
  SummaryService = null;
}
const { formatSuccess } = require('../../../utils/responseFormatter');

class AIController {
  async investigate(req, res, next) {
    try {
      const { assetId } = req.params;
      const { question } = req.body;
      
      const result = await InvestigationService.investigate(assetId, question);
      
      // formatSuccess automatically wraps in { success: true, data: result }
      res.status(200).json(formatSuccess('Investigation completed', result));
    } catch (error) {
      next(error);
    }
  }

  async summary(req, res, next) {
    try {
      const { assetId } = req.params;
      
      if (!SummaryService) {
        throw new Error('Not Implemented: Summary Service business logic has not been created yet.');
      }

      const result = await SummaryService.summarize(assetId);
      
      res.status(200).json(formatSuccess('Asset summary completed', result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AIController();
