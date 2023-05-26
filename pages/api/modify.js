export default async function (req, res) {
    if (req.body.result) {
        req.session.prompt += req.body.result
        res.status(200).json({
            message: "更新成功"
        });
    } else {
        res.status(400).json({
            message: "参数错误"
        });
    }
}