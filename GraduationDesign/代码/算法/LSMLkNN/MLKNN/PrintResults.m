function PrintResults(Result)

fprintf('----------------------------------------\n');
fprintf('评价指标               平均值     标准差\n');
fprintf('----------------------------------------\n');
fprintf('HammingLoss           %.4f     %.4f\n',Result(1,1),Result(1,2));
fprintf('OneError              %.4f     %.4f\n',Result(2,1),Result(2,2));
fprintf('RankingLoss           %.4f     %.4f\n',Result(3,1),Result(3,2));
fprintf('Coverage              %.4f     %.4f\n',Result(4,1),Result(4,2));
fprintf('Average_Precision     %.4f     %.4f\n',Result(5,1),Result(5,2));
fprintf('----------------------------------------\n');

end
